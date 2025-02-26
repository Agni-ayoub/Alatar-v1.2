import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null; 
}

const initialState: AuthState = {
    token: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        tokenSet: (state, action: PayloadAction<string | null>) => {
            if (action.payload) {
                state.token = action.payload;
                localStorage.setItem("token", action.payload);
            }
        },
        tokenClear: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        }
    }
});

export const { tokenSet, tokenClear } = authSlice.actions;
export default authSlice.reducer;
