import { createApi } from "@reduxjs/toolkit/query/react";

interface PublicUrlResponse {
  publicUrl: string;
}

export const apiArtistAvatar = createApi({
  reducerPath: "artistAvatarApi",
  baseQuery: () => ({ data: null }), // кастомный fetch
  endpoints: (builder) => ({
    updateImage: builder.mutation<PublicUrlResponse, { file: File }>({
      async queryFn({ file }) {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token");

          const formData = new FormData();
          formData.append("avatar", file);

          const response = await fetch("http://127.0.0.1:8000/api/admin/upload-avatar", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Upload failed");
          }

          const data = await response.json();
          return { data: { publicUrl: data.url } };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : "Unknown upload error",
            },
          };
        }
      },
    }),

    deleteImage: builder.mutation<void, { fileName: string }>({
      async queryFn({ fileName }) {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token");

          const response = await fetch("http://127.0.0.1:8000/api/admin/delete-avatar", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            body: JSON.stringify({ fileName }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Delete failed");
          }

          return { data: undefined };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error instanceof Error ? error.message : "Unknown delete error",
            },
          };
        }
      },
    }),
  }),
});

export const { useUpdateImageMutation, useDeleteImageMutation } = apiArtistAvatar;
