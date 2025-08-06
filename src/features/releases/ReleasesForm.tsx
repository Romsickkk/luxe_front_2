import { useState } from "react";

import { imageFilter } from "../../hooks/imageFilter";

import { Controller, useForm } from "react-hook-form";
// import { useUpdateReleasesByNameMutation } from "./apiReleases";
// import { useDeleteImageMutation, useUpdateImageMutation } from "../../services/apiReleasesAvatar";

import {
  useGetTableDataQuery,
  useUpdateReleaseByIdMutation,
  useUploadNewReleaseMutation,
  type ReleasesData,
} from "./apiReleases";

import toast from "react-hot-toast";
import Button from "../../ui/Button";
import Select from "react-select";

import makeAnimated from "react-select/animated";
import useSelectData from "../../hooks/useSelectData";
import DefaultAvatar from "../../assets/default-avatar.png";
import { selectStyles } from "../styles/selectStyles";
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

interface FormData {
  name: string;
  owners: string[];
  cygnus: string;
}

interface UserFormProps {
  format: string | null;
  currentRelease: ReleasesData | null;
  onRequestClose: () => void;
}

function ReleasesForm({ format, currentRelease, onRequestClose }: UserFormProps) {
  const { avatar, name, owners, cygnus } = currentRelease ?? {};
  const { ownersData, isLoading: isSelectLoading } = useSelectData();
  const [updateReleaseByName, { isLoading }] = useUpdateReleaseByIdMutation();
  const [uploadRelease] = useUploadNewReleaseMutation();
  const { refetch } = useGetTableDataQuery();

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<string>(typeof avatar === "string" ? avatar : DefaultAvatar);
  const [avatarChanged, setAvatarChanged] = useState<boolean>(false);
  const animatedComponents = makeAnimated();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<FormData>({
    defaultValues: { name, owners, cygnus },
  });

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
        const ownersId: number[] =
          data.owners?.map((ownerName) => ownersData.find((owner) => owner.value === ownerName)!.id).filter(Boolean) ??
          [];

        const formData = new FormData();
        formData.append("name", data.name);
        if (data.cygnus) formData.append("cygnus", data.cygnus);
        if (avatarFile) formData.append("avatar", avatarFile);
        ownersId.forEach((ownerId, index) => {
          formData.append(`owners[${index}]`, String(ownerId));
        });

        const response = await uploadRelease(formData).unwrap();

        reset();
        onRequestClose();
        refetch();
        toast.success("Release created successfully");
        console.log("response: ", response);
      } catch (error) {
        const err = error as { status?: number; data?: { message?: string } };
        if (err?.data?.message) {
          toast.error(err.data.message);
          console.log(error);
        } else {
          toast.error("Unknown error");
          console.log(error);
        }
      }
      return;
    }

    if (currentRelease && format === "Edit") {
      if (!isDirty && !avatarChanged) {
        reset();
        onRequestClose();
        return;
      }

      const newData = {
        ...currentRelease,
        ...Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value !== currentRelease?.[key as keyof FormData])
        ),
        ...(avatarChanged ? { avatar: avatarFile } : {}),
      };

      try {
        const formData = new FormData();
        if (newData.name) formData.append("name", newData.name);
        if (newData.cygnus) formData.append("cygnus", newData.cygnus);

        if (avatarChanged && avatarFile) {
          if (newData.avatar) formData.append("avatar", newData.avatar);
        }
        const ownersId: number[] =
          data.owners?.map((ownerName) => ownersData.find((owner) => owner.value === ownerName)!.id).filter(Boolean) ??
          [];

        if (ownersId.length > 0) {
          ownersId.forEach((ownerId, index) => {
            formData.append(`owners[${index}]`, String(ownerId));
          });
        } else {
          formData.append("owners", "");
        }

        for (const [key, value] of formData) {
          console.log(key, ": ", value);
        }

        const response = await updateReleaseByName({ id: currentRelease.id, newData: formData });
        console.log(response);

        toast.success("Releases information updated.");
        reset();
        onRequestClose();
        refetch();
      } catch (error) {
        toast.error("Releases data update error");
      }
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
      <div>
        <Label>Owner(s)</Label>
        <Controller
          name="owners"
          control={control}
          render={({ field }) => {
            return (
              <Select
                {...field}
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={ownersData}
                value={ownersData.filter((obj) => {
                  return field.value?.includes(obj.value);
                })}
                styles={selectStyles}
                isLoading={isSelectLoading}
                isSearchable={true}
                isMulti
                // onMenuOpen={() => console.log("field", field)}
                onChange={(selectedValues) => {
                  const selected = selectedValues as { value: string }[];
                  field.onChange(selected.map((obj) => obj.value));
                }}
              />
            );
          }}
        />

        {errors.owners && <ErrorMessage>{errors.owners.message}</ErrorMessage>}
      </div>

      {["name", "cygnus"].map((field) => (
        <div key={field}>
          <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
          <InputField
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
        <Button $variations="secondary" $size="medium" type="button" disabled={isLoading} onClick={onRequestClose}>
          Cancel
        </Button>
        <Button $variations="primary" $size="medium" type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </ButtonContainer>
    </FormContainer>
  );
}

export default ReleasesForm;
