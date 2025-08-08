import { IoSunny } from "react-icons/io5";
import { useDarkMode } from "../hooks/useDarkMode";

import { IoIosMoon } from "react-icons/io";

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const svgStyle = { height: "20px", width: "20px" };
  return (
    <div onClick={toggleDarkMode}>{isDarkMode ? <IoSunny style={svgStyle} /> : <IoIosMoon style={svgStyle} />}</div>
  );
}

export default ThemeToggle;
