import { FaUserPlus } from "react-icons/fa";

import { type ModalType } from "../features/artists/ArtistsAgGrid";

import Button from "./Button";

interface AddArtistButtonProps {
  changeModal: (modalName: ModalType) => void;
  name: string;
}
function AddButton({ changeModal, name }: AddArtistButtonProps) {
  function handleSubmit() {
    changeModal("Add");
  }
  return (
    <Button $size="medium" $variations="secondary" onClick={handleSubmit}>
      <FaUserPlus /> Add {name}
    </Button>
  );
}

export default AddButton;
