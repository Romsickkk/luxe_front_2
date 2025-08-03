import { ReactNode } from "react";
import { ArtistData } from "../features/artists/apiArtists";
import { ICellRendererParams } from "ag-grid-community";

import styled from "styled-components";

// Styled components для обертки и кнопки
const AgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #ff6e1b;
  }
`;

// const DivButton = styled.button`
//   background-color: #111827;
//   color: white;
//   border-radius: 5px;
//   padding: 7px 5px;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 8px;

//   &:hover {
//     color: #ff6e1b;
//   }

//   &:active {
//     color: #ff6e1b;
//   }

//   &:focus {
//     color: #ff6e1b;
//     outline: 2px solid #ff6e1b;
//   }
// `;

interface AGButtonProps {
  name: string;
  icon?: ReactNode;
  params: ICellRendererParams;
  modalChange: (name: string) => void;
  changeCurrentData: (artist: ArtistData) => void;
}

function AgEditButton({ name, icon, params, modalChange, changeCurrentData }: AGButtonProps) {
  return (
    <AgDiv
      onClick={() => {
        modalChange(name);
        changeCurrentData(params.data);
      }}
    >
      {icon}
    </AgDiv>
  );
}

export default AgEditButton;
