import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getXSRFTokenFromCookie } from "../../services/srf";

export type ReleasesData = {
  avatar: string | undefined;
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

    uploadNewRelease: builder.mutation<any, { newData: ReleasesDataPost }>({
      query: ({ newData }) => ({
        url: "releases/create",
        method: "POST",
        body: newData,
      }),
    }),

    updateReleaseByName: builder.mutation<any, { newData: ReleasesData }>({
      query: ({ newData }) => ({
        url: `/releases/create`,
        method: "PUT",
        body: newData,
      }),
    }),
  }),
});

export const { useGetTableDataQuery, useUploadNewReleaseMutation, useUpdateReleaseByNameMutation } = apiReleases;
