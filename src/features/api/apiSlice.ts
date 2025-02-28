import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import endPoints from "../endPoints.json";
import { LoginApiResponse, LoginRequest, LogoutResponse, token, getUserResponse } from "../sliceTypes";
import { notificationSet } from "../slices/notificationSlice";
import errorMessages from "./errorMessages.json";

const baseQuery = fetchBaseQuery({
    baseUrl: endPoints.baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithInterceptor : BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {

    const response = await baseQuery(args, api, extraOptions);
    
    if (response?.error) {
        const errorCode = (response.error.data as { code?: keyof typeof errorMessages })?.code;

        if (errorCode && errorMessages[errorCode]) {
            api.dispatch(notificationSet({ type: "error", message: errorMessages[errorCode] }));
        } else {
            api.dispatch(notificationSet({ type: "error", message: 'An unknown error occurred.' }));
        }
    }

    return response;
};

export const ApiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithInterceptor,
    endpoints: (builder) => ({
        logIn: builder.mutation<LoginApiResponse, LoginRequest>({
            query: (credentials) => ({
                url: endPoints.login,
                method: "POST",
                body: credentials,
            }),
        }),
        
        logOut: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: endPoints.logout,
                method: 'POST',
            }),
        }),

        getUser: builder.query<getUserResponse, token>({
            query: () => endPoints.Me,
        }),
    }),
});

export const { useLogInMutation, useLogOutMutation, useGetUserQuery } = ApiSlice;

export default ApiSlice.reducer;
