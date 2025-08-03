import { type ArtistData } from "./apiArtists";

import ReactModal from "react-modal";
import ArtistsForm from "./ArtistsForm";
import Button from "../../ui/Button";

import { type ModalType } from "./ArtistsAgGrid";
import { ButtonContainer, modalStyles, WarningText } from "../styles/FormsStyles";

interface ModalInterface {
  modalName: ModalType;
  onRequestClose: () => void;
  currentArtist?: ArtistData | null;
}
ReactModal.setAppElement("#root");

function ArtistsFormModal({ modalName, onRequestClose, currentArtist }: ModalInterface) {
  const isOpen = !!modalName;

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={`${modalName} Modal`} style={modalStyles}>
      {modalName === "Edit" ? (
        <>
          <p>Edit Artist</p>
          {currentArtist && (
            <ArtistsForm format={modalName} currentArtist={currentArtist} onRequestClose={onRequestClose} />
          )}
        </>
      ) : modalName === "Delete" ? (
        <>
          <WarningText>
            Are you sure to delete artist{" "}
            <span style={{ color: "#FF6E1B", margin: "0 5px" }}>{currentArtist?.name}</span> ?
          </WarningText>

          <ButtonContainer>
            <Button $variations="secondary" $size="medium" onClick={onRequestClose}>
              Cancel
            </Button>
            <Button $variations="danger" $size="medium" onClick={onRequestClose}>
              Delete
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <>
          <p>Add Artist</p>

          <ArtistsForm format={modalName} currentArtist={null} onRequestClose={onRequestClose} />
        </>
      )}
    </ReactModal>
  );
}
export default ArtistsFormModal;
