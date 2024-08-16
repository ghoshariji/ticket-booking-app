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
      // remove all the value except the id value that passed through the action.payload
      return state.filter(
        (val, ind) => val.id !== action.payload
      );
    },
  },
});

export const { addCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
