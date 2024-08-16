import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import cartTotalSlice from "./slice/cartTotalPrice";
// creating the base store for all the store-related operation

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    cartPrice: cartTotalSlice,
  },
});
