import { configureStore } from "@reduxjs/toolkit";
import { restaurantSlice } from "./restaurant.slice";

export const store = configureStore({
    reducer: {
        restaurant: restaurantSlice.reducer
    }
});