import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/api/auth";
import apiReducer, { ApiSlice } from "../features/api/apiSlice"
import notificationReducer from "../features/slices/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
