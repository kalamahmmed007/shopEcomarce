import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: "John Doe",
        email: "johndoe@example.com",
        profilePic: "https://via.placeholder.com/50",
        notifications: 3, // total unread notifications
    },
    notificationsList: [
        { id: 1, text: "Your order #1234 has been shipped.", read: false, date: "2025-10-21" },
        { id: 2, text: "New wishlist item is on sale!", read: false, date: "2025-10-20" },
        { id: 3, text: "Password changed successfully.", read: false, date: "2025-10-19" },
    ],
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        incrementNotifications: (state, action) => {
            state.user.notifications += 1;
            if (action.payload) state.notificationsList.push(action.payload); // add notification
        },
        markNotificationRead: (state, action) => {
            const notif = state.notificationsList.find((n) => n.id === action.payload);
            if (notif) notif.read = true;
            state.user.notifications = state.notificationsList.filter((n) => !n.read).length;
        },
        markAllRead: (state) => {
            state.notificationsList.forEach((n) => (n.read = true));
            state.user.notifications = 0;
        },
        resetNotifications: (state) => {
            state.notificationsList.forEach((n) => (n.read = false));
            state.user.notifications = state.notificationsList.length;
        },
    },
});

export const { updateProfile, incrementNotifications, markNotificationRead, markAllRead, resetNotifications } =
    profileSlice.actions;
export default profileSlice.reducer;
