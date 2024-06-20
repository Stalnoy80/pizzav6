import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId: (state) => {
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = filterSlice.actions;

export default filterSlice.reducer;
