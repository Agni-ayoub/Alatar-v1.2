import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import endPoints from "../endPoints.json";

const baseQuery = fetchBaseQuery({
    baseUrl: endPoints?.baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

export const ApiSlice = createApi({
    reducerPath: "api",
    baseQuery,
    endpoints: (builder) => ({
        logIn: builder.mutation({
            query: (credentials) => ({
                url: endPoints.login,
                method: "POST",
                body: credentials,
            }),
        }),
        logOut: builder.mutation({
            query: () => ({
                url: endPoints.logout,
                method: 'POST',
            }),
        }),
        getCurrentUser: builder.query({
            query: () => endPoints.Me,
        }),
    }),
});

export const { useLogInMutation, useLogOutMutation, useGetCurrentUserQuery } = ApiSlice;
