import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProfiles,
  getSingleProfile,
  createProfile,
  updateProfile,
  addReview,
  deleteReview,
  myProfile,
} from "./profileActions";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  profiles: null,
  error: null,
  total_profiles: null,
  success: false,
  profile: null,
  resultPerPage: null,
  filteredProfilesCount: null,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
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
      state.isCreated = true;
      toast.success("Doctor profile created successfully");
    },
    [createProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //update profile

    [updateProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // profile created successfully
      state.isUpdated = true;
      toast.success("Profile updated successfully");
    },
    [updateProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //all  profiles
    [getAllProfiles.pending]: (state) => {
      state.loading = true;
      state.isCreated = false;
      state.isUpdated = false;
    },
    [getAllProfiles.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;

      state.profiles = payload.profiles;
      state.total_profiles = payload.total_profiles;
      state.resultPerPage = payload.resultPerPage;
      state.filteredProfilesCount = payload.filteredProfilesCount;
    },
    [getAllProfiles.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //get single profile
    [getSingleProfile.pending]: (state) => {
      state.loading = true;
      state.isCreated = false;
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
    //my profile
    [myProfile.pending]: (state) => {
      state.loading = true;
      state.isCreated = false;
    },
    [myProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.profile = payload.profile;
    },
    [myProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    //add Review
    [addReview.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addReview.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // review created successfully
      state.isCreated = true;
      toast.success("Review added successfully");
    },
    [addReview.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },

    //delete Profile Review
    [deleteReview.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deleteReview.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // review deleted
      state.profile = payload.profile;
      toast.success("Profile review deleted successfully");
    },
    [deleteReview.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },
  },
});

export default profileSlice.reducer;
