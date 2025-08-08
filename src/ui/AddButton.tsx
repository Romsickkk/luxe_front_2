import { type ModalType } from "../features/artists/ArtistsAgGrid";

import Button from "./Button";
import React from "react";

interface AddArtistButtonProps {
  changeModal: (modalName: ModalType) => void;
  name: string;
  icon: React.ElementType;
}
function AddButton({ changeModal, name, icon: Icon }: AddArtistButtonProps) {
  function handleSubmit() {
    changeModal("Add");
  }
  return (
    <Button $size="medium" $variations="secondary" onClick={handleSubmit}>
      <Icon style={{ transition: "all 0.2s ease", position: "relative", top: "2.5px" }} /> Add {name}
    </Button>
  );
}

export default AddButton;
