import { instance } from "./instances";

export const apiService = {
    getDishes: async () => {
        try {
            const response = await instance.get('/dishes.json');
            return response.data;
        } catch (error) {
            throw (error);
        }
    },
    createDish: async (dish) => {
        try {
            await instance.post('/dishes.json', dish);
        } catch (error) {
            throw (error);
        }
    },
    updateDish: async (obj) => {
        try {
            await instance.put(`/dishes/${obj.dishId}.json`, obj.dish);
        } catch (error) {
            throw (error);
        }
    },
    deleteDish: async (id) => {
        try {
            await instance.delete(`/dishes/${id}.json`);
        } catch (error) {
            throw (error);
        }
    },
    getOrders: async () => {
        try {
            const response = await instance.get('/orders.json');
            return response.data;
        } catch (error) {
            throw (error);
        }
    },
    deleteOrder: async (id) => {
        try {
            await instance.delete(`/orders/${id}.json`);
        } catch (error) {
            throw (error);
        }
    }
};