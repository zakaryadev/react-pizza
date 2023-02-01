import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "users/fetchPizzasStatus",
  async (props) => {
    const { order, sortBy, category, search, currentPage } = props;
    const { data } = await axios.get(
      `https://63ca2496d0ab64be2b4d182c.mockapi.io/api/v1/items?${category}${search}&sortBy=${sortBy}&order=${order}&limit=4&page=${currentPage}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  loaded: false,
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
    [fetchPizzas.pending](state) {
      state.loaded = false;
    },
    [fetchPizzas.fulfilled](state, action) {
      state.loaded = true;
      state.items = action.payload;
    },
    [fetchPizzas.rejected](state) {
      state.loaded = true;
    },
  },
});

export const { setItems, setLoaded } = pizzasSlice.actions;

export default pizzasSlice.reducer;
