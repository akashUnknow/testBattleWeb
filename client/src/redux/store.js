import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import testReducer from '../store/testSlice';
import testsesion from '../store/testsesionSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    test: testReducer,
    testsesion:testsesion,
  },
});

export default store;
