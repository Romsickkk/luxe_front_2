import { ButtonContainer, modalStyles, WarningText } from "../styles/FormsStyles";

import { type ReleasesData } from "./apiReleases";
import { type ModalType } from "./ReleasesAgGrid";

import Button from "../../ui/Button";
import ReactModal from "react-modal";
import ReleasesForm from "./ReleasesForm";

interface ModalInterface {
  modalName: ModalType;
  onRequestClose: () => void;
  currentReleases?: ReleasesData | null;
}
ReactModal.setAppElement("#root");

function ReleasesFormModal({ modalName, onRequestClose, currentReleases }: ModalInterface) {
  const isOpen = !!modalName;

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={`${modalName} Modal`} style={modalStyles}>
      {modalName === "Edit" ? (
        <>
          <p>Edit Releases</p>
          {currentReleases && (
            <ReleasesForm format={modalName} currentReleases={currentReleases} onRequestClose={onRequestClose} />
          )}
        </>
      ) : modalName === "Delete" ? (
        <>
          <WarningText>
            Are you sure to delete release{" "}
            <span style={{ color: "#FF6E1B", margin: "0 5px" }}>{currentReleases?.name}</span> ?
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
          <p>Add Release</p>

          <ReleasesForm format={modalName} currentReleases={null} onRequestClose={onRequestClose} />
        </>
      )}
    </ReactModal>
  );
}
export default ReleasesFormModal;
