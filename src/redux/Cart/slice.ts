import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS.ts";
import { calcTotalPrice } from "../../utils/calcTotalPrice.ts";
import { CartItem, CartSliceState } from "./types.ts";

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItems: (state, action: PayloadAction<CartItem>) => {
      const findItems = state.items.find((obj) => obj.id === action.payload.id);

      if (findItems) {
        findItems.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<number>) {
      const findItems = state.items.find((obj) => obj.id === action.payload);
      if (findItems) {
        findItems.count--;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    // setFilters: (state, action) => {
    //   state.sort = action.payload.sort;
    //   state.currentPage = Number(action.payload.currentPage);
    //   state.сategoryId = Number(action.payload.сategoryId);
    // },
  },
});

// Action creators are generated for each case reducer function
export const { addItems, removeItem, clearItems, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
