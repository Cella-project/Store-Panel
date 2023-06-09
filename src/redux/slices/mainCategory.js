import {createSlice} from '@reduxjs/toolkit';

const mainCategorySlice = createSlice({
    name: 'mainCategory',
    initialState: {
        mainCategories: null,
        mainCategoryData:null

    },
    reducers: {
        setMainCategories(state, action) {
            state.mainCategories = action.payload;
        },
        setMainCategoryData(state, action) {
            state.mainCategoryData = action.payload;
        },
        addMainCategory(state, action) {
            if (state.mainCategories === null) {
                state.mainCategories = [];
            }
            state.mainCategories.push(action.payload);
        },
        updateMainCategory(state, action) {
            const index = state.mainCategories.findIndex(mainCategory => mainCategory._id === action.payload._id);
            state.mainCategories[index] = action.payload;
        },
        changeMainCategoryState(state, action) {
            const updatedMainCategory = action.payload;
            const existingMainCategoryIndex = state.mainCategories.findIndex(
                (mainCategory) => mainCategory._id === updatedMainCategory._id
            );
            if (existingMainCategoryIndex !== -1) {
                state.mainCategories[existingMainCategoryIndex] = updatedMainCategory;
            }
        },
        deleteMainCategory(state, action) {
            const deletedMainCategoryId = action.payload || action;
            return {
                ...state,
                mainCategories: state.mainCategories.filter(mainCategory => mainCategory._id !== deletedMainCategoryId)
            };
        }
    }
});

export default mainCategorySlice;