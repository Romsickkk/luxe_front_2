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

export type NewArtist = Omit<ArtistData, "id">;

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

    uploadNewArtist: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "artists/create",
        method: "POST",
        body: formData,
      }),
    }),

    updateArtistById: builder.mutation<any, { id: number; newData: FormData }>({
      query: ({ id, newData }) => ({
        url: `artists/update/${id}`,
        method: "POST",
        body: newData,
      }),
    }),

    deleteArtistById: builder.mutation<any, number>({
      query: (id) => ({
        url: `artists/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});
// useIsHaveArtistQuery
export const {
  useGetTableDataQuery,
  useUploadNewArtistMutation,
  useUpdateArtistByIdMutation,
  useDeleteArtistByIdMutation,
} = apiArtists;
