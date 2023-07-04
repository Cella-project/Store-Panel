import { createSlice } from '@reduxjs/toolkit';

const notification = createSlice({
    name: 'notifications',
    initialState: {
        notifications: null,
    },
    reducers: {
        setNotifications(state, action) {
            state.notifications = action.payload;
        }
    }
});

export default notification;