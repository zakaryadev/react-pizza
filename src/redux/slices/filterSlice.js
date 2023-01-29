import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  searchValue: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.searchValue = action.payload.search;
      state.currentPage = +action.payload.currentPage;
      state.categoryId = +action.payload.categoryId;
    }
  }
})

export const {setCategoryId, setSortType, setSearchValue, setCurrentPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;