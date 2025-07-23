import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/auth/",
    credentials: "include",
  }),
  tagTypes: ["User"], 
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    verifyEmail: builder.query({
      query: (token) => `verify-email?token=${token}`,
      providesTags: ["User"]
    }),
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyEmailQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi;
