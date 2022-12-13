import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slices/todoSlice";

// setting up store
export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

