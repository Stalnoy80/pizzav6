import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  сategoryId: 0,
  currentPage: 1,

  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.сategoryId = action.payload;
    },

    setSort: (state, action) => {
      state.sort = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.сategoryId = Number(action.payload.сategoryId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
