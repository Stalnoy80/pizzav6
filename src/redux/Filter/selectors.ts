import { RootState } from "../store";

export const filterSelector = (state: RootState) => state.filterSlice;
export const sortSelector = (state: RootState) => state.filterSlice.sort;
