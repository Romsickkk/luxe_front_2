import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { toggleDarkMode } from "../store/darkModeSlice";
import { useEffect } from "react";

export function useDarkMode() {
  const isDarkMode = useSelector((state: RootState) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return { isDarkMode, toggleDarkMode: () => dispatch(toggleDarkMode()) };
}
