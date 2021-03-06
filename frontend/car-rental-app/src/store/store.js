import { configureStore } from "@reduxjs/toolkit";
import reservationReducer from "../features/car-reservation/reservationSlice";
import addEmployeeReducer from "../features/add-employees/addEmployeeSlice";
import yourReservationReducer from "../features/your-cars/yourCarsSlice";
import carsInfoReducer from "../features/add-car-info/carsInfoSlice";
import authReducer from "../features/authentication/authSlice";
import startingCarParameterReducer from "../features/starting-car-parameter/startingCarParameterSlice";
import userEmailSettingsReducer from "../features/user-settings/userEmailSettingsSlice";
import userPasswordSettingsReducer from "../features/user-settings/userPasswordSettingsSlice";
import userPhoneNumberSettingsReducer from "../features/user-settings/userPhoneNumberSettingsSlice";
import carManagerReducer from "../features/car-management/carManagerSlice";
import employeesManagerReducer from "../features/employees-management/employeesManagerSlice";
import rentsReducer from "../features/rents/rentsSlice";

export default configureStore({
  reducer: {
    reservation: reservationReducer,
    addEmployee: addEmployeeReducer,
    auth: authReducer,
    YourReservation: yourReservationReducer,
    carsInfo: carsInfoReducer,
    startingCarParameter: startingCarParameterReducer,
    userEmailSettings: userEmailSettingsReducer,
    userPasswordSettings: userPasswordSettingsReducer,
    userPhoneNumberSettings: userPhoneNumberSettingsReducer,
    carsManager: carManagerReducer,
    employees: employeesManagerReducer,
    rent: rentsReducer,
  },
});
