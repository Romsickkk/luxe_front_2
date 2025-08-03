import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = () => localStorage.getItem("token");

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ name, password }) => ({
        url: "admin/login",
        method: "POST",
        body: { name, password },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("token", data.token);
        } catch (error) {
          console.error("Login error", error);
        }
      },
      invalidatesTags: [{ type: "Auth", id: "USER" }],
    }),

    currentUser: builder.query({
      query: () => "admin/user",
      providesTags: [{ type: "Auth", id: "USER" }],
    }),
  }),
});

export const { useLoginMutation, useCurrentUserQuery } = authApi;
