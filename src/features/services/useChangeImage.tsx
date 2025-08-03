import { useUpdateImageMutation, useDeleteImageMutation } from "../../services/apiArtistAvatar";
import { updateNewImage } from "./updateNewImage";

interface ChangeImageProps {
  avatar?: string;
  avatarFile: File | null;
  setNewAvatar: (newAvatar: string) => void;
}

const useChangeImage = ({ avatar, avatarFile, setNewAvatar }: ChangeImageProps) => {
  const [updateImage] = useUpdateImageMutation();
  const [deleteImage] = useDeleteImageMutation();

  const changeImage = async () => {
    try {
      if (avatarFile) {
        await updateNewImage(avatarFile, setNewAvatar, updateImage);
      }

      if (avatar) {
        const fileName = avatar.split("/").pop();
        if (fileName) {
          await deleteImage({ storageName: "artistsAvatars", fileName });
        }
      }
    } catch (error) {
      console.log("Ошибка загрузки нового аватара:", error);
    }
  };

  return changeImage;
};

export default useChangeImage;
