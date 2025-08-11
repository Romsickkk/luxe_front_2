import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getXSRFTokenFromCookie } from "./srf";
import { AdminType } from "./authSlice";

type ResponseLoginType = {
  admin: AdminType;
  message: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
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
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<ResponseLoginType, { name: string; password: string }>({
      query: ({ name, password }) => ({
        url: "admin/login",
        method: "POST",
        body: { name, password },
      }),
      invalidatesTags: [{ type: "Auth", id: "USER" }],
    }),

    currentUser: builder.query({
      query: () => "admin/user",
      providesTags: [{ type: "Auth", id: "USER" }],
    }),

    logout: builder.mutation<any, void>({
      query: () => ({
        url: `admin/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useCurrentUserQuery, useLogoutMutation } = authApi;
