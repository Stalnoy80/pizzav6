import { RootState } from "../store";

export const cartSelector = (state: RootState) => state.cartSlice;

export const cartItemSelectorById = (id: number) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);
