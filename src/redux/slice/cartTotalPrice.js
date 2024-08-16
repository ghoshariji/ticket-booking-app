import { createSlice } from "@reduxjs/toolkit";

const cartTotalSlice = createSlice({
    name: 'cart',
    initialState: 0,
    reducers: {
        addPrice: (state, action) => {
            console.log("Current State:", state);
            console.log("Payload:", action.payload);
            return Number(state) + Number(action.payload); 
        },
        deletePrice: (state, action) => {
            console.log("Current State:", state);
            console.log("Payload:", action.payload);
            return Number(state) - Number(action.payload); 
        }
    }
});

export const { addPrice, deletePrice } = cartTotalSlice.actions;
export default cartTotalSlice.reducer;
