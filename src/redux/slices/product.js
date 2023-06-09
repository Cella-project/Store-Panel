import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: null,
        productData: null,
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        },
        addProduct(state, action) {
            if (state.products === null) {
                state.products = [];
            }
            state.products.push(action.payload);
        },
        updateProduct(state, action) {
            state.productData = action.payload;
            state.products = state.products.map(product => {
                if (product._id === action.payload._id) {
                    return action.payload;
                }
                return product;
            }
            );
        },
        setProductData(state, action) {
            state.productData = action.payload;
        },
        changeProductState(state, action) {
            state.productData = action.payload;
        },
        deleteProduct(state, action) {
            const index = state.products.findIndex(product => product._id === action.payload._id);
            state.products.splice(index, 1);
        }
        
    }
});

export default productSlice;