import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import endPoints from "../endPoints.json"
import { RootState } from '../../app/store';
import { EditCompanyResponse, EditDataRequest } from '../sliceTypes';
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

const editMethodSlice = createApi({
    reducerPath: 'editMethod',
    baseQuery : baseQueryWithInterceptor,
    endpoints: (builder) => ({
        editCompany: builder.mutation<EditCompanyResponse, EditDataRequest>({
            query: ({id, formData})=> ({
                url: `${endPoints.company}/${id}`,
                method: "PUT",
                body : formData
            }),
        }),
    }),
});

export const { useEditCompanyMutation } = editMethodSlice;
export const editMethodSliceReducer = editMethodSlice.reducer;
export default editMethodSlice;