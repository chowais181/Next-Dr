import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//login user action
export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/login-user",
        { email, password },
        config
      );

      // store user's token in local storage
      localStorage.setItem("userToken", data.userToken);
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
// logout user action
export const userLogout = createAsyncThunk("user/logout", async () => {
  try {
    await axios.get("/api/v1/logout-user");
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  }
});

//register user action
export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password, phoneNumber }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "/api/v1/register-user",
        { name, email, password, phoneNumber },
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

//get user details action
export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();

      // configure authorization header with user's token
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };

      const { data } = await axios.get(`/api/v1/me`, config);
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

// admin ------ get all users ---

export const getAllUser = createAsyncThunk(
  "user/getAllUser",
  async (currentPage) => {
    try {
      // configure authorization header with user's token
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get(
        `/api/v1/admin/users?page=${currentPage}`,
        config
      );
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

// admin ------ get all doctors ---

// admin -------delete user ----------
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    return data;
  } catch (error) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  }
});

// admin -------update user status ----------
export const updateUserRole = createAsyncThunk(
  "user/updateUserRole",
  async (arg, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/user/${arg.id}`,
        { role: arg.role },
        config
      );
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
