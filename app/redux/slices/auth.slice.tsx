import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceState } from "@/redux/types/auth.type";

const initialState: AuthSliceState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    signupFailed: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      state.success = null;
    },
    signin: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    signinSuccess: (state, { payload: { accessToken, refreshToken } }) => {
      localStorage.setItem("access-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);

      state.loading = false;
      state.error = null;
      state.success = true;
    },
    signinFailed: (state, { payload: { message } }) => {
      state.loading = false;
      state.error = message;
      state.success = null;
    },
    signout: (state) => {
      state.error = null;
      state.success = true;
    },
    getCurrentUser: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    getCurrentUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.user = payload;
    },
    getCurrentUserFailed: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    refreshToken: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    refreshTokenSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    refreshTokenFailed: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    changePassword: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    changePasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    },
    changePasswordFailed: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  signup,
  signupSuccess,
  signupFailed,
  signin,
  signinSuccess,
  signinFailed,
  signout,
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserFailed,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailed,
  changePassword,
  changePasswordSuccess,
  changePasswordFailed,
} = authSlice.actions;

export default authSlice.reducer;
