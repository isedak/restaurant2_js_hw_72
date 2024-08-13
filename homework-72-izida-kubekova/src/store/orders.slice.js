import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiService } from "../api/apiService"


const namespace = 'orders'

export const getOrders = createAsyncThunk(
    `${namespace}/getOrders`,
    async () => {
        return await apiService.getOrders()
    }
);

export const deleteOrder = createAsyncThunk(
    `${namespace}/deleteOrder`,
    async (id, { dispatch }) => {
        await apiService.deleteOrder(id);
        dispatch(getOrders());
    }
);

export const ordersSlice = createSlice({
    name: namespace,
    initialState: {
        orders: {},
        loading: false,
        showError: false,
        errorMessage: '',
        delivery: 150
    },
    extraReducers: builder => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrders.rejected, (state) => {
                state.loading = false;
                state.errorMessage = 'Connection error';
                state.showError = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.errorMessage = '';
                state.showError = false;
                state.orders = action.payload;
            })
            .addCase(deleteOrder.rejected, (state) => {
                state.errorMessage = 'Connection error';
                state.showError = true;
            })
            .addCase(deleteOrder.fulfilled, (state) => {
                state.errorMessage = '';
                state.showError = false;
            })
    }
});