import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/users",
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/auth",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  userApiSlice;
