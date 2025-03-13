import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/api/auth";
import apiReducer, { ApiSlice } from "../features/api/apiSlice"
import notificationReducer from "../features/slices/notificationSlice";
import getMethodSlice, { getMethodSliceReducer } from "../features/api/getMethodSlice";
import editMethodSlice, { editMethodSliceReducer } from "../features/api/editMethodSlice";
import deleteMethodSlice, { deleteMethodSliceReducer } from "../features/api/deleteMethod";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    api: apiReducer,
    notifications: notificationReducer,
    getMethod : getMethodSliceReducer,
    editMethod : editMethodSliceReducer,
    deleteMethod : deleteMethodSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ApiSlice.middleware, getMethodSlice.middleware, editMethodSlice.middleware, deleteMethodSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
