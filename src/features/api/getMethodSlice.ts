import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import endPoints from "../endPoints.json"
import { RootState } from '../../app/store';
import { CompaniesResponse, GetCompanyByIdResponse } from '../sliceTypes';

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
        getCompanies: builder.query<CompaniesResponse, {page:number, search : string}>({
            query: ( {page = 1, search = ""} ) => ({
                url: endPoints.company,
                params : { page, search }
            }),
        }),
        getCompanyById : builder.query<GetCompanyByIdResponse, string>({
            query: (id) => ({
                url: `${endPoints.company}/${id}`,
                method: 'GET',
            }),
        })
    }),
});

export const { useGetCompaniesQuery, useGetCompanyByIdQuery } = getMethodSlice;
export const getMethodSliceReducer = getMethodSlice.reducer;
export default getMethodSlice;