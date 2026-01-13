import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: JSON.parse(localStorage.getItem("orders")) || []
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    updateOrder: (state, action) => {
      const index = state.orders.findIndex(
        (o) => o.id === action.payload.id
      );
      state.orders[index] = action.payload;
      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (o) => o.id !== action.payload
      );
      localStorage.setItem("orders", JSON.stringify(state.orders));
    }
  }
});

export const { addOrder, updateOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
