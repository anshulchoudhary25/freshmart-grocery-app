import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    registeredUsers: [], // stores all registered users
  },
  reducers: {
    registerUser: (state, action) => {
      state.registeredUsers.push(action.payload);
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { registerUser, login, logout } = authSlice.actions;
export default authSlice.reducer;