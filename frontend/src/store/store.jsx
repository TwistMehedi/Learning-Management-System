import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../redux/api/authApi';
import userReducer from "../redux/slice/userSlice.jsx"
import { userApi } from '../redux/api/userApi.jsx';
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
});
