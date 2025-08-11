import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store/store";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.3);
  cursor: wait;
`;

export function LoaderOverlay() {
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);

  if (!isLoading) return null;

  return <Overlay />;
}
