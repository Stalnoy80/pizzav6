export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export type Pizza = {
  id: number;
  title: string;
  price: number;
  types: number[];
  imageUrl: string;
  sizes: number[];
  rating: number;
  items: [];
};
export interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}
export type SearchPizzaParams = {
  сategoryId: number;
  sortBy: string;
  searchValue: string;
  currentPage: number;
};
