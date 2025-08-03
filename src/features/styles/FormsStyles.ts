import styled from "styled-components";
import { LuImagePlus } from "react-icons/lu";

export const FormContainer = styled.form`
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 20px;
  background: var(--color-grey-100);
  border-radius: 8px;
  svg: {
    color: #fff;
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UploadIcon = styled(LuImagePlus)`
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 4px;

  font-size: 25px;
`;

export const RoundAvatar = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: url(${(props) => props.src}) center/cover no-repeat;
  border: 2px;
  color: #fff !important;
  cursor: pointer;
  transition: border 0.3s ease, opacity 0.3s ease, transform 0.3s ease; /* Плавный переход для border и opacity */

  &:hover {
    border: 5px solid rgb(253, 96, 5);
    opacity: 0.8;
    transform: scale(1.1);
  }
  &:hover svg {
    color: rgb(253, 96, 5);
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const InputField = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  background: var(--color-grey-200);

  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #ff6e1b;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  color: var(--color-grey-700);
`;

export const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: #ef4444;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

export const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    backdropFilter: "blur(3px)",
    WebkitBackdropFilter: "blur(10px)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    padding: "20px",
    background: "var(--color-grey-100)",
    zIndex: 1010,
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",

    border: "none",
  },
};

export const WarningText = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
