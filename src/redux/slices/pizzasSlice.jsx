import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  items: [],
  status: "",
};
export const fetchPizzas = createAsyncThunk(
  "pizzasSlice/fetchPizzas",
  async (params, thunkAPI) => {
    const { сategoryId, sortBy, searchValue, currentPage } = params;
    const { data } = await axios.get(
      `https://813cecfc1deed960.mokky.dev/items?page=${currentPage}&limit=4&title=*${searchValue}&${
        сategoryId > 0 ? `category=${сategoryId}` : ""
      }&sortBy=${sortBy}`
    );

    return data.items;
  }
);

export const pizzasSlice = createSlice({
  name: "pizzasSlice",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const pizzaSelector = (state) => state.pizzasSlice;
// Action creators are generated for each case reducer function
export const { setItems, extraReducers } = pizzasSlice.actions;

export default pizzasSlice.reducer;
