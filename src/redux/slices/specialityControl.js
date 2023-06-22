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
        setTags(state, action) {
            state.tags = action.payload;
        },
        setMaterials(state, action) {
            state.materials = action.payload;
        },
        setSizes(state, action) {
            state.sizes = action.payload;
        },
    }
});


export default specialityControlSlice
