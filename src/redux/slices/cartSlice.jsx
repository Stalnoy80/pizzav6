import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItems: (state, action) => {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);

      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce(
        (sum, res) => res.price * res.count + sum,
        0
      );
    },

    minusItem(state, action) {
      const findItems = state.items.find((obj) => obj.id === action.payload);
      if (findItems) {
        findItems.count--;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    setFilters: (state, action) => {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.сategoryId = Number(action.payload.сategoryId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItems, removeItem, clearItems, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
