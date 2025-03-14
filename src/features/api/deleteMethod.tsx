import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import endPoints from "../endPoints.json"
import { RootState } from '../../app/store';
import { DeleteMethodRequest, DeleteMethodResponse } from '../sliceTypes';

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

const deleteMethodSlice = createApi({
    reducerPath: 'deleteMethod',
    baseQuery,
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