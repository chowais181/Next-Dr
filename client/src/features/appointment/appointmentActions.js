import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// create profile

export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async ({ profileId, formData }, { rejectWithValue }) => {
    console.log(profileId, formData);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `/api/v1/create-appointment?profileId=${profileId}`,
        
          formData,
        
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
