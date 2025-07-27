import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statsApi = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/stats/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
     getTotalSellInstructor: builder.query({
      query: () => "course",
    }),
  }),
});

export const { useGetTotalSellInstructorQuery} = statsApi;
