import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addCart: (state, { payload }) => {
      const isCartExist = state.cart.some(
        (item) => item.id === payload.product.id
      );
      if (!isCartExist) {
        state.cart.push({
          ...payload.product,
        });
        toast.success("This item added to cart.");
      } else {
        toast.error("This item is already in the cart.");
      }
      localStorage.setItem("local-cart", JSON.stringify(state.cart));
    },
    addCartWithSize: (state, { payload }) => {
      const isCartExist = state.cart.some(
        (item) => item.id === payload.product.item.id
      );
      if (!isCartExist) {
        state.cart.push({
          ...payload.product,
        });
        toast.success("This item added to cart.");
      } else {
        toast.error("This item is already in the cart.");
      }
      localStorage.setItem("local-cart", JSON.stringify(state.cart));
    },
    deleteCart: (state, { payload }) => {
      const { id, size } = payload;
      state.cart = state.cart.filter(
        (data) => !(data.item.id === id && data.size === size)
      );
      localStorage.setItem("local-cart", JSON.stringify(state.cart));
      toast.error(`Item ${id} with size ${size} has been deleted.`);
    },
    addQty: (state, { payload }) => {
      state.cart = state.cart.filter((item) => {
        if (item.id === payload.id) {
          item.qty = payload.qty;
        }
        return item;
      });
      localStorage.setItem("local-cart", JSON.stringify(state.cart));
    },
    reloadCart: (state, { payload }) => {
      const cart = JSON.parse(localStorage.getItem("local-cart"));
      if (cart) {
        state.cart = cart;
      }
    },
  },
});

export const { addCart, addCartWithSize, deleteCart, addQty, reloadCart } =
  shopSlice.actions;
export default shopSlice.reducer;
