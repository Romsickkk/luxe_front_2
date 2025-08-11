import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import {
  type ArtistData,
  type NewArtist,
  useGetTableDataQuery,
  useUpdateArtistByIdMutation,
  useUploadNewArtistMutation,
} from "./apiArtists";

import Button from "../../ui/Button";

import DefaultAvatar from "../../assets/default-avatar.png";
import { imageFilter } from "../../services/imageFilter";

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
import { responseWithToast } from "../services/responseWithToast";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useDispatch } from "react-redux";

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
  const { data: allArtists, refetch } = useGetTableDataQuery();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<string>(avatar || DefaultAvatar);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);
  const [updateArtistByName] = useUpdateArtistByIdMutation();
  const [uploadNewArtist, { isLoading }] = useUploadNewArtistMutation();

  const [isNameDuplicate, setIsNameDuplicate] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isSubmitting = useSelector((state: RootState) => state.ui.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    reset,
    setError,
    clearErrors,
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

  // Duplicate control
  const nameValue = watch("name");

  useEffect(() => {
    setIsNameDuplicate(false);
    if (!nameValue || !allArtists) return;

    const nameLower = nameValue.trim().toLowerCase();
    const isDuplicate = allArtists.some(
      (artist) => artist.name.toLowerCase() === nameLower && artist.id !== currentArtist?.id
    );

    if (isDuplicate) {
      setIsNameDuplicate(true);
      setError("name", {
        type: "manual",
        message: "Name must be unique",
      });
    } else {
      clearErrors("name");
    }
  }, [nameValue, allArtists, setError, clearErrors, currentArtist]);

  //Avatar filter
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
      const response = await responseWithToast("Loading...", () => uploadNewArtist(formData).unwrap(), dispatch);

      if (response) {
        reset();
        onRequestClose();
        refetch();
      }
      return;
    }

    if (currentArtist && format === "Edit") {
      if (!isDirty && !avatarChanged) {
        reset();
        onRequestClose();
        return;
      }

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
      for (const [key, value] of formData) {
        console.log(key, value);
      }

      if ([...formData.keys()].length > 0) {
        const response = await responseWithToast(
          "Loading...",
          () => updateArtistByName({ id: currentArtist.id, newData: formData }).unwrap(),
          dispatch
        );

        if (response) {
          reset();
          onRequestClose();
          refetch();
        }
      }

      return;
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <AvatarContainer>
        <HiddenFileInput
          disabled={isLoading || isSubmitting}
          id="avatarUpload"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        <AvatarWrapper>
          <RoundAvatar
            disabled={isLoading || isSubmitting}
            onClick={() => document.getElementById("avatarUpload")?.click()}
            src={newAvatar}
          >
            <UploadIcon />
          </RoundAvatar>
        </AvatarWrapper>
      </AvatarContainer>

      {["name", "facebook", "vk", "spotify", "soundcloud", "instagram", "twitter"].map((field) => (
        <div key={field}>
          <Label>{field.length > 3 ? field.charAt(0).toUpperCase() + field.slice(1) : field.toUpperCase()}</Label>
          <InputField
            disabled={isLoading || isSubmitting}
            {...register(field as keyof FormData, {
              required: field === "name" ? `${field[0].toUpperCase() + field.slice(1)} is compulsory` : false,
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
          disabled={isLoading || isSubmitting}
          onClick={onRequestClose}
        >
          Cancel
        </Button>
        <Button
          $variations="primary"
          $size="medium"
          type="submit"
          disabled={isLoading || isSubmitting || isNameDuplicate}
        >
          {isLoading || isSubmitting ? "Saving..." : "Save"}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default ArtistsForm;
