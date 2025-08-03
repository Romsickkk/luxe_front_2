import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  border-radius: 50%;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();
  const darkLogo = "/logo-dark.png";
  const lightLogo = "/logo-light.png";

  return (
    <StyledLogo>
      <NavLink to="/dashboard">
        <Img src={isDarkMode ? darkLogo : lightLogo} alt="Logo" />
      </NavLink>
    </StyledLogo>
  );
}

export default Logo;
