import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import endPoints from "../endPoints.json"
import { RootState } from '../../app/store';
import { DeleteMethodRequest, DeleteMethodResponse } from '../sliceTypes';
import errorMessages from "./errorMessages.json";
import { notificationSet } from '../slices/notificationSlice';

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

const deleteMethodSlice = createApi({
    reducerPath: 'deleteMethod',
    baseQuery : baseQueryWithInterceptor,
    endpoints: (builder) => ({
        deleteMu: builder.mutation<DeleteMethodResponse, DeleteMethodRequest>({
            query: ({id, type})=> ({
                url: `${endPoints[type]}/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const { useDeleteMuMutation } = deleteMethodSlice;
export const deleteMethodSliceReducer = deleteMethodSlice.reducer;
export default deleteMethodSlice;