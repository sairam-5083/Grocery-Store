import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",

  initialState: {
    items: JSON.parse(localStorage.getItem("orders")) || [],
  },

  reducers: {
    addOrder: (state, action) => {
      state.items.unshift(action.payload);
    },

    setOrders: (state, action) => {
      state.items = action.payload;
    },

    clearOrders: (state) => {
      state.items = [];
    },
  },
});

export const {
  addOrder,
  setOrders,
  clearOrders,
} = ordersSlice.actions;

export default ordersSlice.reducer;