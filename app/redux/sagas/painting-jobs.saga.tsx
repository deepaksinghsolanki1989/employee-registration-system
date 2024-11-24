import { call, put, takeLatest } from "redux-saga/effects";
import {
  CREATE_PAINTING_JOB,
  CREATE_PAINTING_JOB_FAILED,
  CREATE_PAINTING_JOB_SUCCESS,
  DELETE_PAINTING_JOB,
  DELETE_PAINTING_JOB_FAILED,
  DELETE_PAINTING_JOB_SUCCESS,
  GET_PAINTING_JOBS,
  GET_PAINTING_JOBS_FAILED,
  GET_PAINTING_JOBS_SUCCESS,
} from "../action.types";
import {
  createPaintingJob,
  deletePaintingJob,
  getAllPaintingJobs,
} from "@/lib/actions";

function* handleGetPaintingJobs(): Generator {
  try {
    const { data } = yield call(getAllPaintingJobs);
    yield put({ type: GET_PAINTING_JOBS_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: GET_PAINTING_JOBS_FAILED,
      payload: { message: error.message },
    });
  }
}

function* handleCreatePaintingJob(action: {
  type: string;
  payload: PaintingJobPayload;
}): Generator {
  try {
    const { data } = yield call(createPaintingJob, action.payload);
    yield put({ type: CREATE_PAINTING_JOB_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: CREATE_PAINTING_JOB_FAILED,
      payload: { message: error.message },
    });
  }
}

function* handleDeletePaintingJob(action: {
  type: string;
  payload: { id: string };
}): Generator {
  try {
    const { data } = yield call(deletePaintingJob, action.payload.id);
    yield put({ type: DELETE_PAINTING_JOB_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: DELETE_PAINTING_JOB_FAILED,
      payload: { message: error.message },
    });
  }
}

function* paintingJobsSaga() {
  yield takeLatest(GET_PAINTING_JOBS, handleGetPaintingJobs);
  yield takeLatest(CREATE_PAINTING_JOB, handleCreatePaintingJob);
  yield takeLatest(DELETE_PAINTING_JOB, handleDeletePaintingJob);
}

export default paintingJobsSaga;
