import { configureStore } from "@reduxjs/toolkit";
import { dishesSlice } from "./dishes.slice";
import { ordersSlice } from "./orders.slice";

export const store = configureStore({
    reducer: {
        dishes: dishesSlice.reducer,
        orders: ordersSlice.reducer
    }
});