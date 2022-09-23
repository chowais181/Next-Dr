import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetails,
  registerUser,
  userLogin,
  userLogout,
} from "./userActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  isLogin: false,
  isRegister: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // logout reducers
    [userLogout.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.isLogin = false;
    },
    [userLogout.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.isLogin = false;
    },
    [userLogout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.isLogin = true;
    },
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
      state.userToken = payload.userToken;
      state.success = true;
      state.isLogin = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.isRegister = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // get user details
    [getUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.user;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
    },
  },
});

// export const { logout } = userSlice.actions;

export default userSlice.reducer;