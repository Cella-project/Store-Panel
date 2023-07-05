import { createSlice } from '@reduxjs/toolkit';

const notification = createSlice({
    name: 'notifications',
    initialState: {
        notifications: null,
    },
    reducers: {
        setNotifications(state, action) {
            state.notifications = action.payload;
        },
        updateNotification(state, action) {
            const notification = action.payload;
            const index = state.notifications.findIndex(n => n._id === notification._id);
            state.notifications[index] = notification;
        }
    }
});

export default notification;