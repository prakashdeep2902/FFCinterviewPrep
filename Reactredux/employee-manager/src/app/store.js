import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employees/employeeSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

// here i am using this concept:
// configureStore()
// Redux Store
