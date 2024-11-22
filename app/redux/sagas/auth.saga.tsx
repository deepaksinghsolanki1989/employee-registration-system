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
} from "@/redux/actionTypes";
import {
  AuthPayload,
  SignInPayload,
  SignUpPayload,
} from "@/redux/types/auth.type";
import { signin, signup } from "@/lib/actions/auth.actions";

// function* checkAuth(): Generator {
//   try {
//     const token = localStorage.getItem("edumrk_dv_ath");
//     if (token) {
//       const response = { data: { valid: "" } };
//       if (response.data.valid) {
//         // yield put(loginSuccess({ api_token: token }));
//       } else {
//         yield put({ type: HANDLE_LOGOUT });
//       }
//     }
//   } catch (error) {
//     yield put({
//       type: LOGIN_FAILED,
//       payload: { message: "Authentication check failed" },
//     });
//     localStorage.removeItem("edumrk_dv_ath");
//   }
// }

// //Implimented!>

// function* loginSaga(action: { type: string; payload: Login }): Generator {
//   try {
//     yield put({ type: SET_LOADING });
//     const response = (yield call(
//       fetch_user_login,
//       action.payload
//     )) as AuthPayload;
//     yield put({ type: LOGIN_SUCCESS, payload: response });
//   } catch (error) {
//     if (error) {
//       const errorMessage = getErrorMessage(error);
//       yield put({ type: LOGIN_FAILED, payload: { message: errorMessage } });
//     }
//   }
// }

// function* resetPasswordSaga(action: {
//   type: string;
//   payload: CreatePassword;
// }): Generator {
//   try {
//     yield put({ type: SET_LOADING });
//     const response = (yield call(reset_password, action.payload)) as Payload;
//     console.log(response);
//     yield put({
//       type:
//         response.status === 200
//           ? RESET_PASSWORD_SUCCESS
//           : RESET_PASSWORD_FAILED,
//     });
//   } catch (error) {
//     const errorMessage = getErrorMessage(error);
//     yield put({ type: LOGIN_FAILED, payload: { message: errorMessage } });
//   }
// }

// function* sendVerifyOtpSaga(action: {
//   type: string;
//   payload: ResetPasswordPayload;
// }): Generator {
//   try {
//     yield put({ type: SET_LOADING });
//     const response = (yield call(
//       otp_reset_password,
//       action.payload
//     )) as ResetPasswordResponse;
//     console.log(response, "response");
//     yield put({
//       type: SEND_VERIFY_OTP_RESET_PASSWORD_SUCCESS,
//       payload: { message: response.message, step: response.data.step },
//     });
//   } catch (error) {
//     const errorMessage = getErrorMessage(error);
//     yield put({ type: LOGIN_FAILED, payload: { message: errorMessage } });
//   }
// }

function* handleSignup(action: {
  type: string;
  payload: SignUpPayload;
}): Generator {
  try {
    (yield call(signup, action.payload)) as AuthPayload;
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
    const { data } = (yield call(signin, action.payload)) as AuthPayload;
    yield put({ type: SIGNIN_SUCCESS, payload: data });
  } catch (error: any) {
    yield put({
      type: SIGNIN_FAILED,
      payload: { message: error.message },
    });
  }
}

function* handleGetCurrentUser(action: {
  type: string;
  payload: unknown;
}): Generator {
  console.log({ action });
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
