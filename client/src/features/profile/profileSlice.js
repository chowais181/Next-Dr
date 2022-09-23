import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProfiles,
  getSingleProfile,
  createProfile,
} from "./profileActions";

const initialState = {
  loading: false,
  profiles: null,
  error: null,
  total_profiles: null,
  success: false,
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    //create Profile
    [createProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // profile created successfully
    },
    [createProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    //all  profiles
    [getAllProfiles.pending]: (state) => {
      state.loading = true;
    },
    [getAllProfiles.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.profiles = payload.profiles;
      state.total_profiles = payload.total_profiles;
    },
    [getAllProfiles.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //get single profile
    [getSingleProfile.pending]: (state) => {
      state.loading = true;
    },
    [getSingleProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.profile = payload.profile;
    },
    [getSingleProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default profileSlice.reducer;
