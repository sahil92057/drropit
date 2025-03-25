import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice"; // Import your reducer

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducers here
  },
});

export type AppDispatch = typeof store.dispatch;