import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  // isAuthenticated: true,
  loading: false,
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
  state.userId = userId || user.userId;  // FIX
  state.email = email;
  state.token = token;
  state.isVerified = user.isVerified;
  state.phoneNumber = user.phoneNumber;
  state.isAuthenticated = true;
  state.loading = false;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
},

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
     updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateVerification: (state, action) => {
      if (state.user) {
        state.user.isVerified = action.payload;
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout,updateUser, updateVerification } = authSlice.actions;
export default authSlice.reducer;
