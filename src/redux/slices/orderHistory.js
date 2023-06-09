import {createSlice} from '@reduxjs/toolkit';

const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState: {
        ordersHistory: null,
        orderHistoryData:null

    },
    reducers: {
        setOrderHistory(state, action) {
            state.ordersHistory = action.payload;
        },
        setOrderHistoryData(state, action) {
            state.orderHistoryData = action.payload;
        },
    }
});

export default orderHistorySlice;

