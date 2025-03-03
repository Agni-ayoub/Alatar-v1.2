import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/api/auth";
import apiReducer, { ApiSlice } from "../features/api/apiSlice"
import notificationReducer from "../features/slices/notificationSlice";
import getMethodSlice, { getMethodSliceReducer } from "../features/api/getMethodSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
    notifications: notificationReducer,
    getMethod : getMethodSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware, getMethodSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
