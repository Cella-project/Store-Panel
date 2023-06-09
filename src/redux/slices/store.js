import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
    name: 'store',
    initialState: {
        stores: null,
        storeData: null,
    },
    reducers: {
        setStores(state, action) {
            state.stores = action.payload;
        },
        addStore(state, action) {
            if (state.stores === null) {
                state.stores = [];
            }
            state.stores.push(action.payload);
        },
        setStoreData(state, action) {
            state.storeData = action.payload;
        },
        changeStoreState(state, action) {
            state.storeData = action.payload;
        },
        deleteStore(state, action) {
            const index = state.stores.findIndex(store => store._id === action.payload._id);
            state.stores.splice(index, 1);
        }
    }
});

export default storeSlice;