import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import endPoints from "../endPoints.json"
import { RootState } from '../../app/store';
import { EditCompanyResponce, EditDataRequest } from '../sliceTypes';

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

const editMethodSlice = createApi({
    reducerPath: 'editMethod',
    baseQuery,
    endpoints: (builder) => ({
        editCompany: builder.mutation<EditCompanyResponce, EditDataRequest>({
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