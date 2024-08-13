import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiService } from "../api/apiService";

const namespace = 'dishes';

export const getDishes = createAsyncThunk(
    `${namespace}/getDishes`,
    async () => {
        return await apiService.getDishes();
    }
);

export const createDish = createAsyncThunk(
    `${namespace}/createDish`,
    async (dish, { dispatch }) => {
        await apiService.createDish(dish);
        dispatch(getDishes());
    }
);

export const updateDish = createAsyncThunk(
    `${namespace}/updateDish`,
    async ({dishId, dish}, {dispatch}) => {
        await apiService.updateDish({dishId, dish});
        dispatch(getDishes());
    }
);

export const deleteDish = createAsyncThunk(
    `${namespace}/deleteDish`,
    async (id, { dispatch }) => {
        await apiService.deleteDish(id);
        dispatch(getDishes());
    }
);

export const dishesSlice = createSlice({
    name: namespace,
    initialState: {
        dishes: {},
        dish: {
            title: '',
            price: 0,
            image: ''
        },
        dishId: '',
        loading: false,
        loadingSending: false,
        showError: false,
        errorMessage: '',
        showingAddForm: false,
        showingEditForm: false,
    },
    reducers: {
        setShowingAddForm(state, action) {
            state.showingAddForm = action.payload
        },
        setShowingEditForm(state, action) {
            state.showingEditForm = action.payload
        },
        setDish(state, action) {
            state.dish = {
                title: action.payload.title,
                price: parseFloat(action.payload.price),
                image: action.payload.image,
            };
        },
        clearDish(state) {
            state.dish = {
                title: '',
                price: 0,
                image: '',
            };
        },
        setDishId(state, action) {
            state.dishId = action.payload;
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
            .addCase(createDish.pending, (state) => {
                state.loadingSending = true
            })
            .addCase(createDish.rejected, (state) => {
                state.loadingSending = false;
                state.errorMessage = 'Connection error';
                state.showError = true;
            })
            .addCase(createDish.fulfilled, (state) => {
                state.loadingSending = false;
                state.errorMessage = '';
                state.showError = false;
            })
            .addCase(updateDish.pending, (state) => {
                state.loadingSending = true;
            })
            .addCase(updateDish.rejected, (state) => {
                state.loadingSending = false;
                state.errorMessage = 'Connection error';
                state.showError = true;
            })
            .addCase(updateDish.fulfilled, (state) => {
                state.loadingSending = false;
                state.errorMessage = '';
                state.showError = false;
            })
            .addCase(deleteDish.rejected, (state) => {
                state.errorMessage = 'Connection error';
                state.showError = true;
            })
            .addCase(deleteDish.fulfilled, (state) => {
                state.errorMessage = '';
                state.showError = false;
            })
    }
});

export const {
    setShowingAddForm,
    setShowingEditForm,
    setDish,
    clearDish,
    setDishId
} = dishesSlice.actions;