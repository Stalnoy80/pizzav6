import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice.tsx";
import cartSlice from "./slices/cartSlice.tsx";
import pizzasSlice from "./slices/pizzasSlice.tsx";
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
