import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: localStorage.getItem("language") || 'ar',
};

const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload;
            localStorage.setItem("language", action.payload);
        },
        getLanguage(state) {
            return state.language;
        },
    },
});

export default languageSlice;
