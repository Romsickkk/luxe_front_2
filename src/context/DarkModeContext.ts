// import { Provider, useSelector, useDispatch } from "react-redux";
// import { toggleDarkMode } from "../store/store";
// import { useEffect } from "react";

// export function DarkModeProvider({ children }) {
//   const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark-mode");
//       document.documentElement.classList.remove("light-mode");
//     } else {
//       document.documentElement.classList.remove("dark-mode");
//       document.documentElement.classList.add("light-mode");
//     }
//   }, [isDarkMode]);

//   return <>{children}</>;
// }

// export function useDarkMode() {
//   const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
//   const dispatch = useDispatch();

//   const toggle = () => dispatch(toggleDarkMode());

//   return { isDarkMode, toggle };
// }
