import { call, put, takeLatest } from "redux-saga/effects";
import {
  APPROVE_EMPLOYEE,
  APPROVE_EMPLOYEE_FAILED,
  APPROVE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_FAILED,
  DELETE_EMPLOYEE_SUCCESS,
  GET_EMPLOYEES,
  GET_EMPLOYEES_FAILED,
  GET_EMPLOYEES_SUCCESS,
} from "../action.types";
import {
  approveEmployee,
  deleteEmployee,
  getAllEmployees,
} from "@/lib/actions";

function* handleGetEmployees(): Generator {
  try {
    const { data } = yield call(getAllEmployees);
    yield put({ type: GET_EMPLOYEES_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: GET_EMPLOYEES_FAILED,
      payload: { message: error.message },
    });
  }
}

function* handleApproveEmployees(action: {
  type: string;
  payload: { id: string };
}): Generator {
  try {
    const { data } = yield call(approveEmployee, action.payload.id);
    yield put({ type: APPROVE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: APPROVE_EMPLOYEE_FAILED,
      payload: { message: error.message },
    });
  }
}

function* handleDeleteEmployees(action: {
  type: string;
  payload: { id: string };
}): Generator {
  try {
    const { data } = yield call(deleteEmployee, action.payload.id);
    yield put({ type: DELETE_EMPLOYEE_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: DELETE_EMPLOYEE_FAILED,
      payload: { message: error.message },
    });
  }
}

function* employeesSaga() {
  yield takeLatest(GET_EMPLOYEES, handleGetEmployees);
  yield takeLatest(APPROVE_EMPLOYEE, handleApproveEmployees);
  yield takeLatest(DELETE_EMPLOYEE, handleDeleteEmployees);
}

export default employeesSaga;
