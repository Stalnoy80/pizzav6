import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  type: string;
  size: number;
  imageUrl: string;
  count: number;
  item: [];
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
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
      state.totalPrice = state.items.reduce(
        (sum, res) => res.price * res.count + sum,
        0
      );
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

export const cartSelector = (state: RootState) => state.cartSlice;

export const cartItemSelectorById = (id: number) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);

// Action creators are generated for each case reducer function
export const { addItems, removeItem, clearItems, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
