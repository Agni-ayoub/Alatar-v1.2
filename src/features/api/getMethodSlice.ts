import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import endPoints from "../endPoints.json"
import { RootState } from '../../app/store';
import { CompaniesResponse } from '../sliceTypes';

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

const getMethodSlice = createApi({
    reducerPath: 'getMethod',
    baseQuery,
    endpoints: (builder) => ({
        getCompanies: builder.query<CompaniesResponse, void>({
            query: () => ({
                url: endPoints.company,
            }),
        }),
    }),
});

export const { useGetCompaniesQuery } = getMethodSlice;
export const getMethodSliceReducer = getMethodSlice.reducer;
export default getMethodSlice;