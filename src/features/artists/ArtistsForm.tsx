import { useState } from "react";

import { useForm } from "react-hook-form";

import { NewArtist, useGetTableDataQuery, useUpdateArtistByIdMutation, useUploadNewArtistMutation } from "./apiArtists";

import { type ArtistData } from "./apiArtists";

import Button from "../../ui/Button";

import toast from "react-hot-toast";
import DefaultAvatar from "../../assets/default-avatar.png";
import { imageFilter } from "../../hooks/imageFilter";

import {
  AvatarContainer,
  AvatarWrapper,
  ButtonContainer,
  ErrorMessage,
  FormContainer,
  HiddenFileInput,
  InputField,
  Label,
  RoundAvatar,
  UploadIcon,
} from "../styles/FormsStyles";

import useChangeImage from "../services/useChangeImage";
// import useUniqueId from "../services/useUnicId";

interface FormData {
  name: string;
  facebook: string;
  vk: string;
  spotify: string;
  soundcloud: string;
  instagram: string;
  twitter: string;
}

interface UserFormProps {
  format: string | null;
  currentArtist: ArtistData | null;
  onRequestClose: () => void;
}

function ArtistsForm({ format, currentArtist, onRequestClose }: UserFormProps) {
  const { avatar, name, facebook, vk, spotify, soundcloud, instagram, twitter } = currentArtist ?? {};
  const { refetch } = useGetTableDataQuery();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<string>(avatar || DefaultAvatar);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);
  // const { newId } = useUniqueId();
  const [updateArtistById, { isLoading }] = useUpdateArtistByIdMutation();
  const [uploadNewArtist, { isLoading: isUploading }] = useUploadNewArtistMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: name ?? "",
      facebook: facebook ?? "",
      vk: vk ?? "",
      spotify: spotify ?? "",
      soundcloud: soundcloud ?? "",
      instagram: instagram ?? "",
      twitter: twitter ?? "",
    },
  });

  const changeImage = useChangeImage({ avatar, avatarFile, setNewAvatar });

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files && imageFilter(files)) {
      const file = files[0];

      const imageUrl = URL.createObjectURL(file);
      setNewAvatar(imageUrl);
      setAvatarFile(file);
      setAvatarChanged(true);
      event.target.value = "";
    }
  }

  async function onSubmit(data: FormData) {
    if (format === "Add") {
      try {
        const formData = new window.FormData();

        const normalizedData: FormData = Object.fromEntries(
          Object.entries(data).map(([key, value]) => {
            if (key !== "name" && value && !value.startsWith("http")) {
              return [key, `https://${value}`];
            }
            return [key, value];
          })
        ) as FormData;

        (Object.entries(normalizedData) as [keyof NewArtist, string][]).forEach(([key, value]) => {
          formData.append(key, value);
        });

        if (avatarFile) {
          formData.append("avatar", avatarFile);
        }

        const response = await uploadNewArtist(formData).unwrap();
        toast.success(response.message);
        console.log(response);

        reset();
        onRequestClose();
        refetch();
      } catch (error) {
        const err = error as { status?: number; data?: { message?: string } };
        if (err?.data?.message) {
          toast.error(err.data.message);
        } else {
          toast.error("Unknown error");
        }
      } finally {
      }
      return;
    }

    if (currentArtist && format === "Edit") {
      if (!isDirty && !avatarChanged) {
        reset();
        onRequestClose();
        return;
      }

      // if (avatarChanged && avatarFile) {
      //   setIsLoadingImage(true);
      //   await changeImage();
      //   setIsLoadingImage(false);
      // }

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        const currentValue = currentArtist[key as keyof ArtistData];
        if (value !== currentValue && value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (avatarChanged && avatarFile) {
        formData.append("avatar", avatarFile);
      }

      if ([...formData.keys()].length > 0) {
        try {
          const response = await updateArtistById({ id: currentArtist.id, newData: formData });
          toast.success(response.data.message);

          reset();
          onRequestClose();
          refetch();
        } catch (error) {
          console.log("Artist data update error: ", error);
          toast.error("Artist data update error");
        }
      }

      return;
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <AvatarContainer>
        <HiddenFileInput id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarChange} />
        <AvatarWrapper>
          <RoundAvatar onClick={() => document.getElementById("avatarUpload")?.click()} src={newAvatar}>
            <UploadIcon />
          </RoundAvatar>
        </AvatarWrapper>
      </AvatarContainer>

      {["name", "facebook", "vk", "spotify", "soundcloud", "instagram", "twitter"].map((field) => (
        <div key={field}>
          <Label>{field.length > 3 ? field.charAt(0).toUpperCase() + field.slice(1) : field.toUpperCase()}</Label>
          <InputField
            {...register(field as keyof FormData, {
              required: field === "name" ? `${field} is compulsory` : false,
              pattern:
                field !== "name"
                  ? {
                      value: /^(https?:\/\/)?([\w\d]+\.)?[\w\d]+\.\w{2,}(\/.*)?$/,
                      message: `Invalid ${field} URL`,
                    }
                  : undefined,
            })}
            placeholder={`Enter ${field}`}
          />
          {errors[field as keyof FormData] && <ErrorMessage>{errors[field as keyof FormData]?.message}</ErrorMessage>}
        </div>
      ))}

      <ButtonContainer>
        <Button
          $variations="secondary"
          $size="medium"
          type="button"
          disabled={isLoading || isLoadingImage}
          onClick={onRequestClose}
        >
          Cancel
        </Button>
        <Button $variations="primary" $size="medium" type="submit" disabled={isLoading || isLoadingImage}>
          {isLoading || isLoadingImage ? "Saving..." : "Save"}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default ArtistsForm;
