import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getXSRFTokenFromCookie } from "../../services/srf";

export type ReleasesData = {
  avatar: string | null;
  name: string;
  owners: string[];
  cygnus: string;
};

export const apiReleases = createApi({
  reducerPath: "apiReleases",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
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
      // Можно добавить transformResponse если нужно подстроить данные
    }),

    updateReleasesByName: builder.mutation<any, { name: string; newData: ReleasesData }>({
      query: ({ name, newData }) => ({
        url: `releases/${encodeURIComponent(name)}`, // например, PUT на releases/{name}
        method: "PUT", // или PATCH — зависит от API
        body: newData,
      }),
    }),
  }),
});

export const { useGetTableDataQuery, useUpdateReleasesByNameMutation } = apiReleases;
