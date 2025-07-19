import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/user/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/",
    }),
  }),
});

export const {useGetUserQuery} = userApi;
