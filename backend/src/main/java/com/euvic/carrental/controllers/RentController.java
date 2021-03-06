package com.euvic.carrental.controllers;

import com.euvic.carrental.model.*;
import com.euvic.carrental.responses.DateFromDateTo;
import com.euvic.carrental.responses.RentDTO;
import com.euvic.carrental.responses.RentPermitRejectDTO;
import com.euvic.carrental.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RestController
@CrossOrigin
public class RentController {
    private final UserService userService;
    private final RentService rentService;
    private final CarService carService;
    private final ParkingService parkingService;
    private final ParkingHistoryService parkingHistoryService;
    private final RentHistoryService rentHistoryService;

    @Autowired
    public RentController(final UserService userService, final RentService rentService, final CarService carService, final ParkingService parkingService, final ParkingHistoryService parkingHistoryService, final RentHistoryService rentHistoryService) {
        this.userService = userService;
        this.rentService = rentService;
        this.carService = carService;
        this.parkingService = parkingService;
        this.parkingHistoryService = parkingHistoryService;
        this.rentHistoryService = rentHistoryService;
    }

    //ADMIN

    @RequestMapping(method = RequestMethod.GET, value = "/a/rent/pending")
    public ResponseEntity<?> getPendingRents() {
        return ResponseEntity.ok(rentService.getAllPendingRents());
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/a/rent/permit/{id}")
    public ResponseEntity<?> permitRent(@PathVariable final Long id, @RequestBody final RentPermitRejectDTO rentPermitRejectDTO) {
        final Rent rent = rentService.getEntityById(id);
        int responseCode;
        String message;
        final Car car = carService.getEntityByLicensePlate(rentPermitRejectDTO.getLicensePlate());
        if (car != null) {
            try {
                rent.setIsActive(true);
                rent.setResponse(rentPermitRejectDTO.getResponse());
                rentService.addEntityToDB(rent);
                responseCode = 200;
                message = "Updated";
            } catch (final NullPointerException | NoSuchElementException e) {
                responseCode = 400;
                message = "Invalid rent ID";
            }
        } else {
            responseCode = 400;
            message = "Car with this license plate doesn't exist";
        }
        return ResponseEntity.status(responseCode).body(message);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/a/rent/reject/{id}")
    public ResponseEntity<?> rejectRent(@PathVariable final Long id, @RequestBody final RentPermitRejectDTO rentPermitRejectDTO) {
        final Rent rent = rentService.getEntityById(id);
        int responseCode;
        String message;
        try {

            final ParkingHistory parkingFrom = new ParkingHistory(null, rent.getParkingFrom());
            final ParkingHistory parkingTo = new ParkingHistory(null, rent.getParkingTo());
            final RentHistory rentHistory = new RentHistory(null, rent.getUser(), rent.getCar(), rent.getDateFrom(), rent.getDateTo(), parkingFrom
                    , parkingTo, false, false, rent.getComment(), rentPermitRejectDTO.getResponse());
            parkingHistoryService.addEntityToDB(parkingFrom);
            parkingHistoryService.addEntityToDB(parkingTo);
            rentHistoryService.addEntityToDB(rentHistory);
            rentService.deleteRent(rent);

            responseCode = 200;
            message = "ok";
        } catch (final NullPointerException e) {
            message = "Invalid rent ID";
            responseCode = 400;
        }
        return ResponseEntity.status(responseCode).body(message);
    }

    //EMPLOYEE
    @RequestMapping(method = RequestMethod.GET, value = "/e/rent/my_history")
    public ResponseEntity<?> getMyHistory() {
        return ResponseEntity.ok(rentHistoryService.getUserRentHistoryDTOs());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/e/rent/my_rents")
    public ResponseEntity<?> getMyRents() {
        return ResponseEntity.ok(rentService.getUserActiveRentDTOs());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/e/rent/my_requests")
    public ResponseEntity<?> getMyRequests() {
        return ResponseEntity.ok(rentService.getUserInactiveRentDTOs());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/e/rent/carsOnTime")
    public ResponseEntity<?> getCarsOnTime(@RequestBody final DateFromDateTo dateFromDateTo) {
        return ResponseEntity.ok(rentService.getActiveCarsBetweenDates(dateFromDateTo));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/e/rent/{licensePlate}")
    public ResponseEntity<?> addRent(@PathVariable final String licensePlate, @RequestBody final RentDTO rentDTO) {
        final User user = userService.getEntityByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        final Car car = carService.getEntityByLicensePlate(licensePlate);

        int responseCode;
        final Long id;
        String message;
        try {
            if (rentService.checkMyRentsBeforeAddNewRent(rentDTO)) {
                id = parkingService.addEntityToDB(parkingService.mapRestModel(null, rentDTO.getParkingDTOTo()));
                car.setParking(parkingService.getEntityById(id));
                final Rent rent = new Rent(null, user, car, rentDTO.getDateFrom(), rentDTO.getDateTo(), car.getParking(), parkingService.getEntityById(id), false, rentDTO.getComment(), "");
                rentService.addEntityToDB(rent);
                responseCode = 200;
                message = "Ok";
            } else {
                responseCode = 400;
                message = "You have rent in this time or give invalid time range";
            }

        } catch (final NullPointerException e) {
            responseCode = 406;
            message = "Cannot find user or car in database";
        }

        return ResponseEntity.status(responseCode).body(message);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/e/rent/revoke_request/{id}")
    public ResponseEntity<?> revokeRentRequest(@PathVariable final Long id) {
        final User user = userService.getEntityByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        final Rent rent = rentService.getEntityById(id);
        int responseCode;
        String message;

        try {
            if (rent.getUser().equals(user)) {
                rentService.deleteRent(rent);
                responseCode = 200;
                message = "Ok";
            } else {
                responseCode = 400;
                message = "Rent is not belong to this user";
            }

        } catch (final NullPointerException e) {
            responseCode = 400;
            message = "Rent doesn't exist";
        }
        return ResponseEntity.status(responseCode).body(message);
    }
}
