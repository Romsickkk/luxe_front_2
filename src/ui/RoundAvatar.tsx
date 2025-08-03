import { useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactModal from "react-modal";
import styled from "styled-components";

interface AvatarProps {
  src: string;
  alt: string;
}

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "700px",
    padding: "20px",
    background: "#1F2937",
    zIndex: 1010,
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    color: "#fff",
    border: "none",
  },
};

const RoundImage = styled.img`
  width: 38px;
  height: 38px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;

const CloseIcon = styled(IoClose)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  z-index: 1020;
  &:hover {
    color: #ff0000;
  }
`;

const ModalImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 40px);
  margin-top: 20px; /* Отступ сверху для иконки */
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
`;

function RoundAvatar({ ...props }: AvatarProps) {
  const [imageModalIsOpen, setImageModalIsOpen] = useState<boolean>(false);

  function imageModalClose() {
    setImageModalIsOpen(false);
  }

  return (
    <>
      <RoundImage onClick={() => setImageModalIsOpen(true)} {...props} />
      <ReactModal
        isOpen={imageModalIsOpen}
        onRequestClose={imageModalClose}
        contentLabel={`${props.alt} Modal`}
        style={modalStyles}
      >
        <CloseIcon onClick={imageModalClose} />
        <ModalImageContainer>
          <ModalImage {...props} />
        </ModalImageContainer>
      </ReactModal>
    </>
  );
}

export default RoundAvatar;
