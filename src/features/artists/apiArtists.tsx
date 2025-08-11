import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getXSRFTokenFromCookie } from "../../authentication/srf";

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
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      const xsrfToken = getXSRFTokenFromCookie();
      if (xsrfToken) {
        headers.set("X-XSRF-TOKEN", xsrfToken);
      }
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
