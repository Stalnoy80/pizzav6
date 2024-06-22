import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  сategoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
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
  },
});

// Action creators are generated for each case reducer function
export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
