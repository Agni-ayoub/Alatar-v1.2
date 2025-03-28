import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import endPoints from "../endPoints.json";
import { LoginApiResponse, LoginRequest } from "../sliceTypes";
import { notificationSet } from "../slices/notificationSlice";
import errorMessages from "./errorMessages.json";
import { loadingStart, loadingStop } from "../slices/loadingSlice";

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
    api.dispatch(loadingStart());

    const response = await baseQuery(args, api, extraOptions);

    if (response?.error) {
        const errorCode = (response.error.data as { code?: keyof typeof errorMessages })?.code;

        if (errorCode && errorMessages[errorCode]) {
            api.dispatch(notificationSet({ type: "error", message: errorMessages[errorCode] }));
        } else {
            api.dispatch(notificationSet({ type: "error", message: 'An unknown error occurred.' }));
        }
    };

    api.dispatch(loadingStop());
    return response;
};

export const ApiSlice = createApi({
    reducerPath: "api",
    baseQuery : baseQueryWithInterceptor,
    endpoints: (builder) => ({
        logIn: builder.mutation<LoginApiResponse, LoginRequest>({
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
        getUser: builder.query({
            query: () => endPoints.Me,
        }),
    }),
});

export const { useLogInMutation, useLogOutMutation, useGetUserQuery } = ApiSlice;

export default ApiSlice.reducer;
