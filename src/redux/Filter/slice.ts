import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types.ts";

const initialState: FilterSliceState = {
  searchValue: "",
  сategoryId: 0,
  currentPage: 1,

  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.сategoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.сategoryId = Number(action.payload.сategoryId);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
