import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import endPoints from "../endPoints.json"
import { RootState } from '../../app/store';
import { DeleteMethodResponse } from '../sliceTypes';
import errorMessages from "./errorMessages.json";
import { notificationSet } from '../slices/notificationSlice';
import { loadingStart, loadingStop } from '../slices/loadingSlice';

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

const deleteMethodSlice = createApi({
    reducerPath: 'deleteMethod',
    baseQuery : baseQueryWithInterceptor,
    endpoints: (builder) => ({
        deleteCompany: builder.mutation<DeleteMethodResponse, string>({
            query: (id)=> ({
                url: `company/${id}`,
                method: "DELETE",
            }),
        }),
        deleteUser: builder.mutation<DeleteMethodResponse, string>({
            query: (id)=> ({
                url: `company/user/${id}`,
                method: "DELETE",
            }),
        }),
        deleteVehicle: builder.mutation<DeleteMethodResponse, string>({
            query: (id)=> ({
                url: `company/vehicle/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useDeleteCompanyMutation, useDeleteUserMutation } = deleteMethodSlice;
export const deleteMethodSliceReducer = deleteMethodSlice.reducer;
export default deleteMethodSlice;