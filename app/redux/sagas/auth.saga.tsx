import { call, put, takeLatest } from "redux-saga/effects";
import {
  SIGNUP,
  SIGNIN,
  GET_CURRENT_USER,
  REFRESH_TOKEN,
  CHANGE_PASSWORD,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  SIGNIN_SUCCESS,
  SIGNIN_FAILED,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILED,
} from "@/redux/action.types";
import { getCurrentUser, signin, signup } from "@/lib/actions";

function* handleSignup(action: {
  type: string;
  payload: SignUpPayload;
}): Generator {
  try {
    yield call(signup, action.payload);
    yield put({ type: SIGNUP_SUCCESS });
  } catch (error: any) {
    yield put({
      type: SIGNUP_FAILED,
      payload: { message: error.message },
    });
  }
}

function* handleSignin(action: {
  type: string;
  payload: SignInPayload;
}): Generator {
  try {
    const { data } = yield call(signin, action.payload);
    yield put({ type: SIGNIN_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: SIGNIN_FAILED,
      payload: { message: error.message },
    });
  }
}

function* handleGetCurrentUser(): Generator {
  try {
    const { data } = yield call(getCurrentUser);
    yield put({ type: GET_CURRENT_USER_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: GET_CURRENT_USER_FAILED,
      payload: { message: error.message },
    });
  }
}

function* handleRefreshToken(action: {
  type: string;
  payload: unknown;
}): Generator {
  console.log({ action });
}

function* handleChangePassword(action: {
  type: string;
  payload: unknown;
}): Generator {
  console.log({ action });
}

function* authSaga() {
  yield takeLatest(SIGNUP, handleSignup);
  yield takeLatest(SIGNIN, handleSignin);
  yield takeLatest(GET_CURRENT_USER, handleGetCurrentUser);
  yield takeLatest(REFRESH_TOKEN, handleRefreshToken);
  yield takeLatest(CHANGE_PASSWORD, handleChangePassword);
}

export default authSaga;
