import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuth } from "./authSlice";
import { authApi } from "./apiAuth";
import toast from "react-hot-toast";

export const logoutThunk = createAsyncThunk("auth/logout", async (_, { dispatch, rejectWithValue }) => {
  try {
    const logoutResult = await dispatch(authApi.endpoints.logout.initiate());
    document.cookie = "X-XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch(clearAuth());
    dispatch(authApi.util.resetApiState());
    toast.success("Log out");
    return logoutResult.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
