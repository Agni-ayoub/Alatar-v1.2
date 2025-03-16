import { createSlice } from '@reduxjs/toolkit';

interface Loadingtate {
    isLoading: boolean;
}

const initialState: Loadingtate = {
    isLoading : false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        loadingStart: (state) => {
            state.isLoading = true;
        },
        loadingStop: (state) => {
            state.isLoading = false;
        },
    },
});

export const { loadingStart, loadingStop } = loadingSlice.actions;

export default loadingSlice.reducer;