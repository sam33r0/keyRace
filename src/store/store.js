import { configureStore } from '@reduxjs/toolkit'
import authSlice from "./authSlice";
import scoreSlice from './scoreSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        score: scoreSlice
    }
})
export default store;
