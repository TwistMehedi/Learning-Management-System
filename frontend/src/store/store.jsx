import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../redux/api/authApi";
import userReducer from "../redux/slice/userSlice.jsx";
import { userApi } from "../redux/api/userApi.jsx";
import { courseApi } from "../redux/api/courses/courseApi.jsx";
import { lessonApi } from "../redux/api/lessons/lessonApi.jsx";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      courseApi.middleware,
      lessonApi.middleware
    ),
});
