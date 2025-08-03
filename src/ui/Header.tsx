import { FaUser } from "react-icons/fa";
import { GiEvilMoon } from "react-icons/gi";
import { IoLogOut, IoSunny } from "react-icons/io5";
import styled from "styled-components";
import ThemeToggle from "./ThemeToggle";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  gap: 0.5rem;
  display: flex;

  align-items: center;
  justify-content: flex-end;
`;

const svgStyle = { height: "20px", width: "20px" };

const StyledSvg = styled.div`
  padding: 0.2rem 1rem 0.2rem 1rem;
  cursor: pointer;
  &:last-child {
    padding-right: 0;
  }
  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #ff6e1b;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <StyledSvg>
        <FaUser />
      </StyledSvg>
      <StyledSvg>
        <ThemeToggle />
      </StyledSvg>
      <StyledSvg>
        <IoLogOut style={svgStyle} />
      </StyledSvg>
    </StyledHeader>
  );
}

export default Header;
