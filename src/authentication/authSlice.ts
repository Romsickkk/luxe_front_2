import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AdminType = {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
};

type AuthState = {
  user: AdminType | null;
  isAuthenticated: boolean;
};

const initialIsAuth = localStorage.getItem("isAuthenticated") === "true";

const initialState: AuthState = {
  user: null,
  isAuthenticated: initialIsAuth,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
  },
});
export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
