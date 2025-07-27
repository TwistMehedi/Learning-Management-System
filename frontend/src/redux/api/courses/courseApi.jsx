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
        if (filter?.page) params.append("page", filter.page);

        return `courses?${params.toString()}`;
      },
    }),
     allCoursesForAdmin: builder.query({
      query: () => `all/courses/for/admin`,
    }),
    getCourse: builder.query({
      query: (id) => `course/${id}`,
    }),
    updateCourse: builder.mutation({
      query: ({id, formData})=>({
        url:`update-course/${id}`,
        method: "PUT",
        body: formData,
         
      }),
      invalidatesTags: ["Courses"],
    }),

    deleteCourse: builder.mutation({
      query: (id)=>({
        url:`delete-course/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: ["Courses"],
    }),

    enrollCourses: builder.query({
      query: () => "enroll-course",
    }),
    allCourseByInstructor: builder.query({
      query: () => "instructor-courses",
    }),

    latestCourses: builder.query({
      query: () => "latest-courses",
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useAllCoursesForAdminQuery,
  useCategoriesQuery,
  useAllCoursesQuery,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useEnrollCoursesQuery,
  useAllCourseByInstructorQuery,
  useLatestCoursesQuery
} = courseApi;
