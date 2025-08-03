import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const storedMode = localStorage.getItem("isDarkMode");
  if (storedMode !== null) return JSON.parse(storedMode);
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    isDarkMode: getInitialDarkMode(),
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
