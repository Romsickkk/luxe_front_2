import { IoSunny } from "react-icons/io5";
import { useDarkMode } from "../hooks/useDarkMode";
import { GiEvilMoon } from "react-icons/gi";

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const svgStyle = { height: "20px", width: "20px" };
  return (
    <div onClick={toggleDarkMode}>{isDarkMode ? <IoSunny style={svgStyle} /> : <GiEvilMoon style={svgStyle} />}</div>
  );
}

export default ThemeToggle;
