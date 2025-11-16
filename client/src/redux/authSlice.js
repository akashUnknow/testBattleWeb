import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false, // Add loading state
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token, email, userId } = action.payload;
      
      state.user = user;
      state.userId = userId || user.userId;
      state.email = email;
      state.token = token;
      state.isVerified = user.isVerified;
      state.phoneNumber = user.phoneNumber;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    updateVerification: (state, action) => {
      if (state.user) {
        state.user.isVerified = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  updateUser, 
  updateVerification,
  setLoading 
} = authSlice.actions;

export default authSlice.reducer;