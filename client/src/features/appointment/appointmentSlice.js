import { createSlice } from "@reduxjs/toolkit";
import { createAppointment } from "./appointmentActions";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  appointments: null,
  error: null,
  total_appointment: null,
  success: false,
  appointment: null,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: {
    //create appointment
    [createAppointment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createAppointment.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // appointment created successfully
      state.isCreated = true;
      toast.success("Appointment created successfully");
    },
    [createAppointment.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload);
    },
  },
});

export default profileSlice.reducer;
