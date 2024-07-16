import { CartItem } from "../redux/Cart/types";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, res) => res.price * res.count + sum, 0);
};
