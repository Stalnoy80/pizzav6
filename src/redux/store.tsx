import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./Filter/slice.ts";
import cartSlice from "./Cart/slice.ts";
import pizzasSlice from "./Pizza/slice.ts";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
