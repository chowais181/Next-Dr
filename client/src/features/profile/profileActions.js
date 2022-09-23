import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// create profile

//register user action
export const createProfile = createAsyncThunk(
  "user/createProfile",
  async ({ formData }, { rejectWithValue }) => {
    // console.log(phoneNumber);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post("/api/v1/create-profile", { formData }, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//get all profiles
export const getAllProfiles = createAsyncThunk(
  "profile/getAllProfiles",
  async () => {
    try {
      const { data } = await axios.get(`/api/v1/all-profiles`);
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
