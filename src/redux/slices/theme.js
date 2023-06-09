import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: localStorage.getItem("theme") || '',
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action) {
            state.mode = action.payload;
            localStorage.setItem("theme", action.payload);
        },
        getTheme(state) {
            return state.mode;
        },
    },
});

export default themeSlice;
