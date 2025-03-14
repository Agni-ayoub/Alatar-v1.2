import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import endPoints from "../endPoints.json"
import { RootState } from '../../app/store';
import { CreateMethodRequest, CreateMethodResponce } from '../sliceTypes';

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

const createMethodSlice = createApi({
    reducerPath: 'createMethod',
    baseQuery,
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