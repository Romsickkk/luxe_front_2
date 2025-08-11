import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getXSRFTokenFromCookie } from "./srf";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  admin: {
    id: number;
    name: string;
    created_at: string;
  };
}

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
  endpoints: (builder) => ({
    signIn: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSignInMutation } = authApi;
