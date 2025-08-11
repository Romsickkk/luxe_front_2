import { useDeleteArtistByIdMutation, useGetTableDataQuery, type ArtistData } from "./apiArtists";

import ReactModal from "react-modal";
import ArtistsForm from "./ArtistsForm";
import Button from "../../ui/Button";

import { type ModalType } from "./ArtistsAgGrid";
import { ButtonContainer, modalStyles, WarningText } from "../styles/FormsStyles";
import toast from "react-hot-toast";
import { useState } from "react";

interface ModalInterface {
  modalName: ModalType;
  onRequestClose: () => void;
  currentArtist?: ArtistData | null;
}
ReactModal.setAppElement("#root");

function ArtistsFormModal({ modalName, onRequestClose, currentArtist }: ModalInterface) {
  const [deleteArtistById, { isLoading }] = useDeleteArtistByIdMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const { refetch } = useGetTableDataQuery();
  const isOpen = !!modalName;

  async function handleDeleteArtist() {
    if (!currentArtist) {
      toast.error("No artist.");
      return;
    }
    setIsDeleting(true);
    try {
      const response = await deleteArtistById(currentArtist.id).unwrap();
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      const err = error as { status?: number; data?: { message?: string } };
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("Unknown error");
      }
    } finally {
      setIsDeleting(false);
    }
    refetch();
    onRequestClose();
  }

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
            <Button $variations="secondary" $size="medium" onClick={onRequestClose} disabled={isLoading || isDeleting}>
              Cancel
            </Button>
            <Button $variations="danger" $size="medium" onClick={handleDeleteArtist} disabled={isLoading || isDeleting}>
              {isLoading || isDeleting ? "Deleting" : "Delete"}
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
