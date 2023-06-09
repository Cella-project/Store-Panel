import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        userData: null,
        forgetPasswordCycle: {
            email: null,
            OTP: null
        }
    },
    reducers: {
        setAuthData(state, action) {
            state.token = action.payload.token;
            state.userData = action.payload.userData;
        },
        setToken(state, action) {
            state.token = action.payload;
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