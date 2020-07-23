import { configureStore } from "@reduxjs/toolkit";
import reservationReducer from "../features/car-reservation/reservationSlice";
import addEmployeeReducer from "../features/car-reservation/addEmployeeSlice";
import yourReservationReducer from "../features/your-cars/yourCarsSlice";

export default configureStore({
  reducer: {
    reservation: reservationReducer,
    addEmployee: addEmployeeReducer,
    YourReservation: yourReservationReducer,
  },
});
