import { createSlice } from '@reduxjs/toolkit';

const logActivitySlice = createSlice({
    name: 'logs',
    initialState: {
        logs: null,
    },
    reducers: {
        setLogs(state, action) {
            state.logs = action.payload;
        }
    }
});

export default logActivitySlice;