import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getXSRFTokenFromCookie } from "../../authentication/srf";

export type ReleasesData = {
  id: number;
  avatar: string | File | undefined;
  name: string;
  owners: string[] | undefined;
  cygnus: string | undefined;
};

type ReleasesDataPost = Omit<ReleasesData, "owners"> & {
  owners: number[] | undefined;
};

export const apiReleases = createApi({
  reducerPath: "apiReleases",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
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
    getTableData: builder.query<ReleasesData[], void>({
      query: () => ({
        url: "releases",
        method: "GET",
      }),
    }),

    uploadNewRelease: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "releases/create",
        method: "POST",
        body: formData,
      }),
    }),

    updateReleaseById: builder.mutation<any, { id: number; newData: FormData }>({
      query: ({ id, newData }) => ({
        url: `/releases/update/${id}`,
        method: "POST",
        body: newData,
      }),
    }),

    deleteReleaseById: builder.mutation<any, number>({
      query: (id) => ({
        url: `/releases/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTableDataQuery,
  useUploadNewReleaseMutation,
  useUpdateReleaseByIdMutation,
  useDeleteReleaseByIdMutation,
} = apiReleases;
