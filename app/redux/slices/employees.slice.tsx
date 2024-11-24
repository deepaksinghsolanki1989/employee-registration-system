import { createSlice } from "@reduxjs/toolkit";

const initialState: EmployeesSliceState = {
  employees: [],
  loading: false,
  error: null,
  success: false,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    getEmployees: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    getEmployeesSuccess: (state, { payload }) => {
      state.employees = payload;
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    getEmployeesFailed: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      state.success = null;
    },
    approveEmployees: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    approveEmployeesSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    approveEmployeesFailed: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      state.success = null;
    },
    deleteEmployees: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    deleteEmployeesSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    deleteEmployeesFailed: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      state.success = null;
    },
  },
});

export const {
  getEmployees,
  getEmployeesSuccess,
  getEmployeesFailed,
  approveEmployees,
  approveEmployeesSuccess,
  approveEmployeesFailed,
  deleteEmployees,
  deleteEmployeesSuccess,
  deleteEmployeesFailed,
} = employeesSlice.actions;

export default employeesSlice.reducer;
