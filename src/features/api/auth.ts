import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../sliceTypes";

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: localStorage.getItem("token") || null,
    user: null,
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
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    }
});

export const { tokenSet, tokenClear, setUser } = authSlice.actions;
export default authSlice.reducer;
