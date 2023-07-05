import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null,
        userData: null,
        forgetPasswordCycle: {
            email: null,
            OTP: [],
        }
    },
    reducers: {
        setAuthData(state, action) {
            state.userData = action.payload.userData;
        },
        setToken(state, action) {
            state.accessToken = action.payload.access;
            state.refreshToken = action.payload.refresh;
        },
        setUserData(state, action) {
            state.userData = action.payload;
        },
        setEmail(state, action) {
            state.forgetPasswordCycle.email = action.payload;
        },
        setOTP(state, action) {
            state.forgetPasswordCycle.OTP = action.payload;
        },
        clearForgetPasswordCycle(state) {
            state.forgetPasswordCycle.email = null;
            state.forgetPasswordCycle.OTP = null;
        }
    }
});

export default authSlice;