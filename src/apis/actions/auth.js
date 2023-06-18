import Axios from '../AxiosInstance';

import router from '../../router/router';

import errorHandler from '../../services/errorHandler';

import {
    stickyMutations,
    popupMutation,
    authMutations
} from '../../redux/mutations';

const authActions = {
    login(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/store-auth/login', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setAuthData({
                        token: response.data.token,
                        userData: response.data.data
                    }));
                    localStorage.setItem('Access Token', response.data.token.access);
                    localStorage.setItem('Refresh Token', response.data.token.refresh);
                    localStorage.setItem('User', JSON.stringify(response.data.data));
                    router.navigate('/');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Logged In successfully, Welcome Back.'
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    refreshToken(payload) {
        return async (dispatch) => {
            try {
                const response = await Axios.post('/api/store-auth/refresh-token', {
                    refreshToken: payload
                });
                if (response.status === 200) {
                    dispatch(authMutations.setToken(response.data.token));
                    localStorage.setItem('Access Token', response.data.token.access);
                    localStorage.setItem('Refresh Token', response.data.token.refresh);
                }
            }
            catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    forgetPassword(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/store-auth/forget-password', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setEmail(payload.email));
                    router.navigate('/auth/verify-code');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Check your email, we send you an OTP to reset your password.'
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    verifyOTP(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/store-auth/validate-otp', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setOTP(payload.otp));
                    router.navigate('/auth/reset-password');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Successfull, set your new password.'
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    resetPassword(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/store-auth/reset-password', payload);
                if (response.status === 200) {
                    dispatch(authMutations.clearForgetPasswordCycle());
                    router.navigate('/auth/login');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'Your password changed successfully.'
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    changeProfileImage() { },
    editProfile() { },
    changePassword() { },
    logout() {
        return async (dispatch) => {
            dispatch(stickyMutations.popAllNotes());
            dispatch(stickyMutations.pushNote({
                type: 'success',
                msg: 'You logged out successfully.'
            }));
            localStorage.removeItem('Access Token');
            localStorage.removeItem('Refresh Token');
            localStorage.removeItem('User');
            dispatch(authMutations.setAuthData({
                token: null,
                user: null
            }));
        }
    }
}

export default authActions;