import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  // first is name
  name: "cart",
  initialState: [],
  // now add all the functions
  reducers: {
    addCart: (state, action) => {
      state.push(action.payload);
    },
    deleteCart: (state, action) => {
      return state.filter(
        (val, ind) => val.destinationS === action.payload.destinationS
      );
    },
  },
});

export const { addCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
