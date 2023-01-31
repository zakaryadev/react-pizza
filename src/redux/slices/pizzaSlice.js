import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "users/fetchPizzasStatus",
  async ({ order, sortBy, category, search, currentPage }) => {
    const { data } = await axios.get(
      `https://63ca2496d0ab64be2b4d182c.mockapi.io/api/v1/items?${category}${search}&sortBy=${sortBy}&order=${order}&limit=4&page=${currentPage}`
    );
    return data;
  }
);

const initialState = {
  loaded: false,
  items: [],
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setLoaded(state, action) {
      state.loaded = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.fulfilled](state, action) {
      state.items = action.payload;
    },
  },
});

export const { setItems, setLoaded } = pizzasSlice.actions;

export default pizzasSlice.reducer;
