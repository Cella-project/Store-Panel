import { createSlice } from '@reduxjs/toolkit';

const stickySlice = createSlice({
    name: 'sticky',
    initialState: {
        notes: []
    },
    reducers: {
        pushNote(state, action) {
            const id = `${Date.now().toString().slice(-4)}-${Math.random()}`;
            state.notes.push({
                id,
                ...action.payload
            });
        },
        popNote(state, action) {
            state.notes = state.notes.filter(note => {
                return note.id !== action.payload;
            });
        },
        popAllNotes(state) {
            state.notes = [];
        }
    }
});

export default stickySlice;