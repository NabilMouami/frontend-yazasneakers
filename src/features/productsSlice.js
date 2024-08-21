import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productList: [],
  Col: {},
  Details: {},
};

const productsSlice = createSlice({
  initialState,
  name: "productList",
  reducers: {
    loadAllProducts: (state, action) => {
      console.log(action.payload);
      state.productList = action.payload;
    },
    loadDetailsProduct: (state, action) => {
      console.log(action.payload);
      state.Details = action.payload;
    },
  },
});

export const { loadAllProducts, loadDetailsProduct } = productsSlice.actions;

export const productList = (state) => state.Products.productList;
export const Details = (state) => state.Products.Details;

export default productsSlice.reducer;
