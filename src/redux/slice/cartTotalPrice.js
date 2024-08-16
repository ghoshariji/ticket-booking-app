import { createSlice } from "@reduxjs/toolkit";

const cartTotalSlice = createSlice({
  name: "cart",
  initialState: 0,
  reducers: {
    addPrice: (state, action) => {
      return Number(state) + Number(action.payload);
    },
    deletePrice: (state, action) => {
      const newState = state - Number(action.payload);
      return newState > 0 ? newState : 0;
    },
  },
});

export const { addPrice, deletePrice } = cartTotalSlice.actions;
export default cartTotalSlice.reducer;
