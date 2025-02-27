import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

interface Notification {
    type: 'error' | 'success' | 'info';
    message: string;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [] as Notification[],
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        notificationSet: (_, action: PayloadAction<Notification>) => {
            if(action.payload.type === 'error') {
                toast.error(action.payload.message);
            } else if(action.payload.type === 'success') {
                toast.success(action.payload.message);
            } else if(action.payload.type === 'info') {
                toast.info(action.payload.message);
            }
        },
    },
});

export const { notificationSet } = notificationSlice.actions;

export default notificationSlice.reducer;