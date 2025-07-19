import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/auth/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
      }),
    }),
    verifyEmail: builder.query({
      query: (token) => `verify-email?token=${token}`,
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "login",
        method: "POST",
        body: loginData,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyEmailQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
