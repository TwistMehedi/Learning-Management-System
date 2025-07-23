import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/course/",
    credentials: "include",
  }),
  tagTypes: ['Courses'],
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (formData) => ({
        url: '/create-course',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Courses'],
    }),

    categories: builder.query({
      query: () => "categories",
    }),
    allCourses: builder.query({
      query: (filter) => {
        const params = new URLSearchParams();

        if (filter?.search) params.append("search", filter.search);
        if (filter?.category) params.append("category", filter.category);
        if (filter?.sort) params.append("sort", filter.sort);
        if (filter?.price) params.append("price", filter.price);

        return `courses?${params.toString()}`;
      },
    }),
    getCourse: builder.query({
      query: (id) => `course/${id}`,
    }),
    enrollCourses: builder.query({
      query: () => "enroll-course",
    }),
    allCourseByInstructor: builder.query({
      query: () => "instructor-courses",
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useCategoriesQuery,
  useAllCoursesQuery,
  useGetCourseQuery,
  useEnrollCoursesQuery,
  useAllCourseByInstructorQuery
} = courseApi;
