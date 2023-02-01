import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://63ca2496d0ab64be2b4d182c.mockapi.io/api/v1/items?${category}${search}&sortBy=${sortBy}&order=${order}&limit=4&page=${currentPage}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending](state) {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled](state, action) {
      state.status = "success";
      state.items = action.payload;
    },
    [fetchPizzas.rejected](state) {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems, setLoaded } = pizzasSlice.actions;

export default pizzasSlice.reducer;
