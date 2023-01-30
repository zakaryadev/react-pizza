import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state, action) {
      state.items = [];
    },
    totalPrice(state) {
      state.items.map((item) => {
        return (state.totalPrice += item.price);
      });
    },
  },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
