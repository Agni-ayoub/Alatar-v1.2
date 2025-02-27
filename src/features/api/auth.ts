import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../sliceTypes";

interface AuthState {
    token: string | null;
    user: User | null;
    byChoice?: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem("token") || null,
    user: null,
    byChoice: false,
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
            state.user = null;
        },
        userSet: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        byChoiseSet: (state, action: PayloadAction<boolean>) => {
            state.byChoice = action.payload;
        },
    }
});

export const { tokenSet, tokenClear, userSet, byChoiseSet } = authSlice.actions;
export default authSlice.reducer;
