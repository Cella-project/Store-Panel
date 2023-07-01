import { configureStore } from '@reduxjs/toolkit';

import stickySlice from './slices/sticky';
import popupSlice from './slices/popup';
import authSlice from './slices/auth';
import themeSlice from './slices/theme';
import languageSlice from './slices/language';
import specialitySlice from './slices/speciality';
import specialityControlSlice from './slices/specialityControl';
import mainCategorySlice from './slices/mainCategory';
import subCategorySlice from './slices/subCategory';
import productSlice from './slices/product';
import orderSlice from './slices/order';
import orderHistorySlice from './slices/orderHistory';
import logActivitySlice from './slices/logActivity';


export default configureStore({
    reducer: {
        sticky: stickySlice.reducer,
        popup: popupSlice.reducer,
        auth: authSlice.reducer,
        theme: themeSlice.reducer,
        language: languageSlice.reducer,
        speciality: specialitySlice.reducer,
        specialityControl: specialityControlSlice.reducer,
        mainCategory: mainCategorySlice.reducer,
        subCategory: subCategorySlice.reducer,
        product: productSlice.reducer,
        order: orderSlice.reducer,
        orderHistory: orderHistorySlice.reducer,
        log: logActivitySlice.reducer,
    }
});