import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// create profile

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(`/api/v1/create-profile`, formData, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (formData, { rejectWithValue }) => {
    console.log(formData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(`/api/v1/my-profile`, formData, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// get my  profile
export const myProfile = createAsyncThunk("profile/myProfile", async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/v1/my-profile`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  }
});

// delete my profile
export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.delete(`/api/v1/my-profile`, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//get all profiles
export const getAllProfiles = createAsyncThunk(
  "profile/getAllProfiles",
  async ({ currentPage, keyword }) => {
    try {
      let link;
      if (keyword === "") {
        link = `/api/v1/all-profiles?page=${currentPage}`;
      } else {
        link = `/api/v1/all-profiles?page=${currentPage}&keyword=${keyword}`;
      }

      const { data } = await axios.get(link);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);

//get  profile by id
export const getSingleProfile = createAsyncThunk(
  "profile/getSingleProfile",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/single-profile/${id}`);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//create profile  review
export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ profileId, comment }, { rejectWithValue }) => {
    console.log(profileId, comment);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/create-profile-review`,
        {
          profileId,
          comment,
        },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// delete profile review
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ _id, doctorId }) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/profile-reviews?id=${_id}&profileId=${doctorId}`
      );
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return error.response.data.message;
      } else {
        return error.message;
      }
    }
  }
);
