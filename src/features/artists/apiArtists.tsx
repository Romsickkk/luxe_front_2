import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type ArtistData = {
  id: number;
  name: string;
  avatar: string | undefined;
  facebook: string | undefined;
  vk: string | undefined;
  spotify: string | undefined;
  soundcloud: string | undefined;
  instagram: string | undefined;
  twitter: string | undefined;
};

type NewArtist = Omit<ArtistData, "id" | "avatar">;

export const apiArtists = createApi({
  reducerPath: "apiArtists",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTableData: builder.query<ArtistData[], void>({
      query: () => "artists",
    }),

    // isHaveArtist: builder.query<boolean, number>({
    //   query: (id) => `artists/${id}/exists`,
    // }),

    uploadNewArtist: builder.mutation<any, { newData: NewArtist }>({
      query: ({ newData }) => ({
        url: "artists/create",
        method: "POST",
        body: newData,
      }),
    }),

    updateArtistById: builder.mutation<any, { id: number; newData: ArtistData }>({
      query: ({ id, newData }) => ({
        url: `artists/${id}/update`,
        method: "PUT",
        body: newData,
      }),
    }),

    deleteArtist: builder.mutation<any, number>({
      query: (id) => ({
        url: `artists/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
// useIsHaveArtistQuery
export const { useGetTableDataQuery, useUploadNewArtistMutation, useUpdateArtistByIdMutation } = apiArtists;
