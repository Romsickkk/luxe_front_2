import { useState } from "react";

import { imageFilter } from "../../hooks/imageFilter";

import { Controller, useForm } from "react-hook-form";
// import { useUpdateReleasesByNameMutation } from "./apiReleases";
// import { useDeleteImageMutation, useUpdateImageMutation } from "../../services/apiReleasesAvatar";

import { useGetTableDataQuery, useUpdateReleasesByNameMutation, type ReleasesData } from "./apiReleases";

import toast from "react-hot-toast";
import Button from "../../ui/Button";
import Select from "react-select";

import makeAnimated from "react-select/animated";
import useSelectData from "../../ui/useSelectData";
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
  currentReleases: ReleasesData | null;
  onRequestClose: () => void;
}

function ReleasesForm({ format, currentReleases, onRequestClose }: UserFormProps) {
  const { avatar, name, owners, cygnus } = currentReleases ?? {};
  const { ownersNames, isLoading: isSelectLoading } = useSelectData();
  const [updateReleasesByName, { isLoading }] = useUpdateReleasesByNameMutation();
  const { refetch } = useGetTableDataQuery();

  // const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<string>(avatar || DefaultAvatar);
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
      // setAvatarFile(file);
      setAvatarChanged(true);
      event.target.value = "";
    }
  }

  async function onSubmit(data: FormData) {
    if (format === "Add") {
      console.log("Entered data:", { ...data, newAvatar });
      reset();
      onRequestClose();
      return;
    }

    if (currentReleases && format === "Edit") {
      if (!isDirty && !avatarChanged) {
        console.log("Нет изменений");
        reset();
        onRequestClose();
        return;
      }

      const newData = {
        ...currentReleases,
        ...Object.fromEntries(
          Object.entries(data).filter(([key, value]) => value !== currentReleases?.[key as keyof FormData])
        ),
        ...(avatarChanged ? { avatar: newAvatar } : {}),
      };

      if (Object.keys(newData).length) {
        console.log("Datas changed:", newData);

        try {
          await updateReleasesByName({ name: newData.name, newData });
        } catch (error) {
          console.log("Releases data update error: ", error);
          toast.error("Releases data update error");
        }
      }
      toast.success("Releases information updated.");
      reset();
      onRequestClose();
    }
    refetch();
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
          render={({ field }) => (
            <Select
              {...field}
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={ownersNames}
              value={ownersNames.filter((obj) => field.value?.includes(obj.value))}
              styles={selectStyles}
              isLoading={isSelectLoading}
              isSearchable={true}
              isMulti
              onMenuOpen={() => console.log("field", field)}
              onChange={(selectedValues) => {
                const selected = selectedValues as { value: string }[];
                field.onChange(selected.map((obj) => obj.value));
              }}
            />
          )}
        />

        {errors.owners && <ErrorMessage>{errors.owners.message}</ErrorMessage>}
      </div>

      {["name", "cygnus"].map((field) => (
        <div key={field}>
          <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
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
