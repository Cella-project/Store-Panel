import {createSlice} from '@reduxjs/toolkit';

const subCategorySlice = createSlice({
    name: 'subCategory',
    initialState: {
        subCategories: null,
        subCategoryData:null

    },
    reducers: {
        setSubCategories(state, action) {
            state.subCategories = action.payload;
        },
        setSubCategoryData(state, action) {
            state.subCategoryData = action.payload;
        },
        addSubCategory(state, action) {
            if (state.subCategories === null) {
                state.subCategories = [];
            }
            state.subCategories.push(action.payload);
        },
        updateSubCategory(state, action) {
            const index = state.subCategories.findIndex(subCategory => subCategory._id === action.payload._id);
            state.subCategories[index] = action.payload;
        },
        changeSubCategoryState(state, action) {
            const updatedSubCategory = action.payload;
            const existingSubCategoryIndex = state.subCategories.findIndex(
                (subCategory) => subCategory._id === updatedSubCategory._id
            );
            if (existingSubCategoryIndex !== -1) {
                state.subCategories[existingSubCategoryIndex] = updatedSubCategory;
            }
        },
        deletesubCategory(state, action) {
            const deletedSubCategoryId = action.payload || action;
            return {
                ...state,
                subCategories: state.subCategories.filter(subCategory => subCategory._id !== deletedSubCategoryId)
            };
        }
    }
});

export default subCategorySlice;