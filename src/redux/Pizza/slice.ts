import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, PizzasSliceState, SearchPizzaParams, Status } from "./types.ts";

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizzasSlice/fetchPizzas",
  async (params: SearchPizzaParams) => {
    const { сategoryId, sortBy, searchValue, currentPage } = params;
    const { data } = await axios.get<Pizza>(
      `https://813cecfc1deed960.mokky.dev/items?page=${currentPage}&limit=4&title=*${searchValue}&${
        сategoryId ? `category=${сategoryId}` : ""
      }&sortBy=${sortBy}`
    );

    return data.items;
  }
);

export const pizzasSlice = createSlice({
  name: "pizzasSlice",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
