import { createSlice } from "@reduxjs/toolkit";

const specialityControlSlice = createSlice({
    name : 'specialityControl',
    initialState : {
        colors: null,
        tags: null,
        materials: null,
        sizes: null,
    },
    reducers : {
        setColors(state, action) {
            state.colors = action.payload;
        },
        addColor(state, action) {
            if (state.colors === null) {
                state.colors = [];
            }
            state.colors.push(action.payload);
        },
        updateColor(state, action) {
            const index = state.colors.findIndex(color => color._id === action.payload._id);
            state.colors[index] = action.payload;
        },
        deleteColor(state, action) {
            const deletedColorId = action.payload || action;
            return {
                ...state,
                colors: state.colors.filter(color => color._id !== deletedColorId)
            };
        },
        setTags(state, action) {
            state.tags = action.payload;
        },
        addTag(state, action) {
            if (state.tags === null) {
                state.tags = [];
            }
            state.tags.push(action.payload);
        },
        updateTag(state, action) {
            const index = state.tags.findIndex(tag => tag._id === action.payload._id);
            state.tags[index] = action.payload;
        },
        deleteTag(state, action) {
            const deletedTagId = action.payload || action;
            return {
                ...state,
                tags: state.tags.filter(tag => tag._id !== deletedTagId)
            };
        },
        setMaterials(state, action) {
            state.materials = action.payload;
        },
        addMaterial(state, action) {
            if (state.materials === null) {
                state.materials = [];
            }
            state.materials.push(action.payload);
        },
        updateMaterial(state, action) {
            const index = state.materials.findIndex(material => material._id === action.payload._id);
            state.materials[index] = action.payload;
        },
        deleteMaterial(state, action) {
            const deletedMaterialId = action.payload || action;
            return {
                ...state,
                materials: state.materials.filter(material => material._id !== deletedMaterialId)
            };
        },
        setSizes(state, action) {
            state.sizes = action.payload;
        },
        addSize(state, action) {
            if (state.sizes === null) {
                state.sizes = [];
            }
            state.sizes.push(action.payload);
        },
        updateSize(state, action) {
            const index = state.sizes.findIndex(size => size._id === action.payload._id);
            state.sizes[index] = action.payload;
        },
        deleteSize(state, action) {
            const deletedSizeId = action.payload || action;
            return {
                ...state,
                sizes: state.sizes.filter(size => size._id !== deletedSizeId)
            };
        },
    }
});


export default specialityControlSlice
