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

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
