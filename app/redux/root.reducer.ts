import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/auth.slice";
import employeesReducer from "@/redux/slices/employees.slice";
import paintingJobsReducer from "@/redux/slices/painting-jobs.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  paintingJobs: paintingJobsReducer,
});

export default rootReducer;
