import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../api/apiService";

const namespace = 'restaurant';

export const getDishes = createAsyncThunk(
    `${namespace}/getDishes`,
    async () => {
        return await apiService.getDishes();
    }
);

export const createOrder = createAsyncThunk(
    `${namespace}/createOrder`,
    async (order) => {
        await apiService.createOrder(order);
    }
);

export const restaurantSlice = createSlice({
    name: namespace,
    initialState: {
        dishes: {},
        dishesInCart: [],
        delivery: 150,
        totalPrice: 150,
        loading: false,
        showingModal: false,
        showingSuccessModal: false,
        showError: false,
        errorMessage: '',        
    },
    reducers: {
        clearCart(state) {
            state.dishesInCart = [];
            state.order = {};
            state.totalPrice = state.delivery;
        },
        setShowingModal(state, action) {
            state.showingModal = action.payload
        },
        setShowingSuccessModal(state, action) {
            state.showingSuccessModal = action.payload
        },
        addDishToCart(state, action) {
            try {
                const index = state.dishesInCart.findIndex(d => d.title === action.payload.dish.title);
                let copyState = [...state.dishesInCart];
                if (index !== -1) {
                    const copyDish = { ...copyState[index] };
                    copyDish.quantity = copyDish.quantity + 1;
                    copyDish.sum = copyDish.price * copyDish.quantity;
                    copyState[index] = copyDish;
                    state.dishesInCart = copyState;
                } else {
                    copyState.push({
                        title: action.payload.dish.title,
                        quantity: 1,
                        price: action.payload.dish.price,
                        sum: parseFloat(action.payload.dish.price),
                        id: action.payload.id
                    });
                    state.dishesInCart = copyState;
                };
                state.totalPrice = parseFloat(state.totalPrice) + parseFloat(action.payload.dish.price);
            } catch (error) {
                console.log(error);
            };
        },
        removeDishInCart(state, action) {
            try {
                let copyState = [...state.dishesInCart];
                const copyDish = { ...copyState[action.payload] };
                if (copyDish.quantity > 1) {
                    copyDish.quantity = parseInt(copyDish.quantity) - 1;
                    copyDish.sum = parseFloat(copyDish.price) * parseInt(copyDish.quantity);
                    copyState[action.payload] = copyDish;
                    state.dishesInCart = copyState;
                } else {
                    copyState.splice(action.payload, 1);
                    state.dishesInCart = copyState;
                };
                state.totalPrice = parseFloat(state.totalPrice) - parseFloat(copyDish.price);
            } catch (error) {
                console.log(error);
            };
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getDishes.pending, (state) => {
                state.loading = true
            })
            .addCase(getDishes.rejected, (state) => {
                state.loading = false;
                state.errorMessage = 'Connection error';
                state.showError = true;
            })
            .addCase(getDishes.fulfilled, (state, action) => {
                state.errorMessage = '';
                state.showError = false;
                state.loading = false;
                state.dishes = action.payload;
            })
            .addCase(createOrder.rejected, (state) => {
                state.errorMessage = 'Connection error';
                state.showError = true;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.errorMessage = '';
                state.showError = false;
                state.showingSuccessModal = true;
            })
    }
});

export const {
    clearCart,
    setShowingModal,
    setShowingSuccessModal,
    addDishToCart,
    removeDishInCart
} = restaurantSlice.actions;