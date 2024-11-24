import { all } from "redux-saga/effects";
import authSaga from "@/redux/sagas/auth.saga";
import employeesSaga from "@/redux/sagas/employees.saga";
import paintingJobsSaga from "@/redux/sagas/painting-jobs.saga";

export default function* rootSaga() {
  yield all([authSaga(), employeesSaga(), paintingJobsSaga()]);
}
