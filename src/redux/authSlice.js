import { createSlice } from '@reduxjs/toolkit';

const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: savedUser || null,          // load user if exists
  token: null,                      // token will be added later when backend connects
  isAuthenticated: !!savedUser,     // true if user is found in localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // Support both {user, token} or plain user objects
      if (action.payload?.user) {
        state.user = action.payload.user;
        state.token = action.payload.token || null;
      } else {
        state.user = action.payload;
      }
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user'); // remove from localStorage on logout
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user)); // keep updated profile
    },
  },
});

export const { loginSuccess, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
