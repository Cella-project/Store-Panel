import {createSlice} from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: null,
        orderData:null

    },
    reducers: {
        setOrder(state, action) {
            state.orders = action.payload;
        },
        setOrderData(state, action) {
            state.orderData = action.payload;
        },
    }
});

export default orderSlice;

