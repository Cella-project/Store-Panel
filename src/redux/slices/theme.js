import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: localStorage.getItem('Store theme') || '',
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action) {
            state.mode = action.payload;
            localStorage.setItem('Store theme', action.payload);
        },
        getTheme(state) {
            return state.mode;
        },
    },
});

export default themeSlice;
