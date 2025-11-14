import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import testReducer from '../store/testSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    test: testReducer,
  },
});

export default store;
