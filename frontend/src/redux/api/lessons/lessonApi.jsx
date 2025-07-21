
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lessonApi = createApi({
  reducerPath: "lessonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/lesson/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    freeLessons: builder.query({
      query: (courseId) => `${courseId}/free`,
    }),
  }),
});

export const {useFreeLessonsQuery} = lessonApi;
