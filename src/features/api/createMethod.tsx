import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import endPoints from "../endPoints.json"
import { RootState } from '../../app/store';
import { CreateMethodRequest, CreateMethodResponce } from '../sliceTypes';
import { notificationSet } from '../slices/notificationSlice';
import errorMessages from "./errorMessages.json";
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

const createMethodSlice = createApi({
    reducerPath: 'createMethod',
    baseQuery : baseQueryWithInterceptor,
    endpoints: (builder) => ({
        createMu: builder.mutation<CreateMethodResponce, CreateMethodRequest>({
            query: ({ type, formData })=> ({
                url: `${endPoints[type]}`,
                method: "POST",
                body: formData
            }),
        }),
    }),
});

export const { useCreateMuMutation } = createMethodSlice;
export const createMethodSliceReducer = createMethodSlice.reducer;
export default createMethodSlice;