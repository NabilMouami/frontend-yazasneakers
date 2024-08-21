import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerInfo: {},
};
const customerSlice = createSlice({
  initialState,
  name: "customerInfo",
  reducers: {
    loadCustomer: (state, action) => {
      console.log(action.payload);
      state.customerInfo = action.payload;
    },
  },
});

export const { loadCustomer } = customerSlice.actions;

export const customerInfo = (state) => state.Customer.customerInfo;

export default customerSlice.reducer;
