import { CartItem } from "../redux/Cart/types.ts";
import { calcTotalPrice } from "./calcTotalPrice.ts";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
