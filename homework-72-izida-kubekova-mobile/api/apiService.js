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
    createOrder: async (order) => {
        try {            
            await instance.post('/orders.json', order);
        } catch (error) {
            throw (error);
        }
    }
};

