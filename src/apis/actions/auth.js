import Axios from '../AxiosInstance';

import router from '../../router/router';

import errorHandler from '../../services/errorHandler';

import {
    stickyMutations,
    popupMutation,
    authMutations
} from '../../redux/mutations';

const authActions = {
    login(payload, msg1) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/store-auth/login', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setAuthData({
                        access: response.data.token.access,
                        refresh: response.data.token.refresh,
                        userData: response.data.data
                    }));
                    localStorage.setItem('Access Token', response.data.token.access);
                    localStorage.setItem('Refresh Token', response.data.token.refresh);
                    router.navigate('/store-panel/');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: msg1
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    getProfile() {
        return async (dispatch) => {
            try {
                const response = await Axios.get('/api/store-profile/profile');
                if (response.status === 200) {
                    dispatch(authMutations.setUserData(response.data.data));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    verifyEmail(ownerID) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.get(`/api/store-profile/verify-email/${ownerID}`);
                if (response.status === 200) {
                    dispatch(popupMutation.clearPopPanel());
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    validateOTP(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/store-profile/validate-otp', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setUserData(response.data.data));
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: 'OTP verified successfully.'
                    }));
                    dispatch(this.getProfile());
                    afterSuccess();
                }
            } catch (error) {
                console.log(error);
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
                if (error.response.status === 401 && error.response.message === 'jwt expired') {
                    localStorage.removeItem('Access Token');
                    localStorage.removeItem('Refresh Token');
                    router.navigate('/store-panel/login');
                }
                errorHandler(dispatch, error.response);
            }
        }
    },
    forgetPassword(payload, msg1) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/store-auth/forget-password', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setEmail(payload.email));
                    router.navigate('/store-panel/auth/verify-code');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: msg1
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    verifyOTP(payload, msg1) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/store-auth/validate-otp', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setOTP(payload.otp));
                    router.navigate('/store-panel/auth/reset-password');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: msg1
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    resetPassword(payload, msg1) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/store-auth/reset-password', payload);
                if (response.status === 200) {
                    dispatch(authMutations.clearForgetPasswordCycle());
                    router.navigate('/store-panel/auth/login');
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: msg1
                    }));
                }
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    changeProfileImage(payload, afterSuccess, msg1, msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/file-manager/file', payload);
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: msg1
                }));
                afterSuccess(response);
            } catch (error) {
                errorHandler(dispatch, error.response, msg2);
            }
        }
    },
    editProfile(payload, afterSuccess, msg1, msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/store-profile/store', payload);
                if (response.status === 200) {
                    dispatch(authMutations.setUserData(response.data.data));
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: msg1
                    }));
                    afterSuccess();
                }
            } catch (error) {
                console.log(error);
                console.log(payload);
                errorHandler(dispatch, error.response, msg2);
            }
        }
    },
    changePassword(payload, afterSuccess, msg1, msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/store-profile/change-password', payload);
                if (response.status === 200) {
                    dispatch(popupMutation.clearPopPanel());
                    dispatch(stickyMutations.pushNote({
                        type: 'success',
                        msg: msg1
                    }));
                    afterSuccess();
                }
            } catch (error) {
                errorHandler(dispatch, error.response, msg2);
            }
        }
    },
    logout(msg1) {
        return async (dispatch) => {
            dispatch(stickyMutations.popAllNotes());
            dispatch(stickyMutations.pushNote({
                type: 'success',
                msg: msg1
            }));
            localStorage.removeItem('Access Token');
            localStorage.removeItem('Refresh Token');
            localStorage.removeItem('User');
            dispatch(authMutations.setAuthData({
                token: null,
                user: null
            }));
        }
    },
    addStoreSocialMediaAccount(payload, afterSuccess, msg1, msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/store-profile/add-social-account', payload);
                dispatch(authMutations.setUserData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: msg1
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response, msg2);
            }
        }
    },
    deleteStoreSocialMediaAccount(payload, msg1, msg2, msg3) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: msg1,
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/store-profile/remove-social-account', payload);
                        dispatch(authMutations.setUserData(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: msg2
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, msg3);
            }
        }
    },
    addStoreBranch(payload, afterSuccess, msg1, msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/store-profile/add-address', payload);
                dispatch(authMutations.setUserData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: msg1
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response, msg2);
            }
        }
    },
    deleteStoreBranch(payload, msg1, msg2, msg3) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: msg1,
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/store-profile/remove-address', payload);
                        dispatch(authMutations.setUserData(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: msg2
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, msg3);
            }
        }
    },
}

export default authActions;