import { ButtonContainer, modalStyles, WarningText } from "../styles/FormsStyles";

import { useDeleteReleaseByIdMutation, useGetTableDataQuery, type ReleasesData } from "./apiReleases";
import { type ModalType } from "./ReleasesAgGrid";

import Button from "../../ui/Button";
import ReactModal from "react-modal";
import ReleasesForm from "./ReleasesForm";
import toast from "react-hot-toast";
import styled from "styled-components";
import { useState } from "react";

interface ModalInterface {
  modalName: ModalType;
  onRequestClose: () => void;
  currentRelease?: ReleasesData | null;
}
ReactModal.setAppElement("#root");

const ReleaseName = styled.span`
  color: #ff6e1b;
  margin: 0 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

function ReleasesFormModal({ modalName, onRequestClose, currentRelease }: ModalInterface) {
  const [deleteRelease, { isLoading }] = useDeleteReleaseByIdMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const { refetch } = useGetTableDataQuery();
  const isOpen = !!modalName;

  async function handleDeleteRelease() {
    if (!currentRelease) {
      toast.error("No artist.");
      return;
    }
    setIsDeleting(true);
    try {
      const response = await deleteRelease(currentRelease.id).unwrap();
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
          <p>Edit Releases</p>
          {currentRelease && (
            <ReleasesForm format={modalName} currentRelease={currentRelease} onRequestClose={onRequestClose} />
          )}
        </>
      ) : modalName === "Delete" ? (
        <>
          <WarningText>
            Are you sure to delete release <ReleaseName>{currentRelease?.name}</ReleaseName> ?
          </WarningText>

          <ButtonContainer>
            <Button $variations="secondary" $size="medium" onClick={onRequestClose} disabled={isLoading || isDeleting}>
              Cancel
            </Button>
            <Button
              $variations="danger"
              $size="medium"
              onClick={handleDeleteRelease}
              disabled={isLoading || isDeleting}
            >
              {isLoading || isDeleting ? "Deleting" : "Delete"}
            </Button>
          </ButtonContainer>
        </>
      ) : (
        <>
          <p>Add Release</p>

          <ReleasesForm format={modalName} currentRelease={null} onRequestClose={onRequestClose} />
        </>
      )}
    </ReactModal>
  );
}
export default ReleasesFormModal;
