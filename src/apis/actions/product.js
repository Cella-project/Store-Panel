import Axios from '../AxiosInstance';
import { productMutations, popupMutation, stickyMutations } from '../../redux/mutations';
import errorHandler from '../../services/errorHandler';

const productActions = {
    getProducts(storeId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/product-main/store-products/${storeId}`);
                dispatch(productMutations.setProducts(response.data.data));
            } catch (error) {
                dispatch(productMutations.setProducts([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    addProduct(payload, afterSuccess,msg1,msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/product-main/product', payload);
                dispatch(productMutations.addProduct(response.data.data));
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
    addProductPicture(payload, afterSuccess, msg1, msg2) {
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
    updateProduct(payload,afterSuccess,msg1,msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/product-main/product', payload);
                dispatch(productMutations.updateProduct(response.data.data));
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
    deleteProduct(productId, afterSuccess, msg1, msg2, msg3) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: msg1,
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`/api/product-main/product/${productId}`);
                        dispatch(productMutations.deleteProduct(productId));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: msg2
                        }));
                        afterSuccess();
                    }
                }))
            } catch (error) {
                errorHandler(dispatch, error.response, msg3);
            }
        }
    },
    getProductData(productId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.get(`/api/product-main/product/${productId}`);
                dispatch(productMutations.setProductData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
            } catch (error) {
                dispatch(productMutations.setProductData({}));
                errorHandler(dispatch, error.response);
            }
        }
    },
    changeProductState(productId, msg1, msg2, msg3) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: msg1,
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put(`api/product-main/change-state/`, { _id: productId });
                        dispatch(productMutations.changeProductState(response.data.data));
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
    addProductColor(payload,msg1,msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/product-profile/add-color', payload);
                dispatch(productMutations.setProductData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: msg1
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, msg2);
            }
        }
    },
    deleteProductColor(payload,msg1,msg2,msg3) {
        return async (dispatch) => {
            dispatch(popupMutation.clearPopPanel());
            dispatch(stickyMutations.popAllNotes());
            dispatch(popupMutation.popQuestion({
                msg: msg1,
                onSubmit: async () => {
                    try {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/product-profile/remove-color', payload);
                        dispatch(productMutations.setProductData(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: msg2
                        }));
                    } catch (error) {
                        errorHandler(dispatch, error.response, msg3);
                    }
                }
            }));
        }
    },
    addProductSize(payload,msg1,msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/product-profile/add-size', payload);
                dispatch(productMutations.setProductData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: msg1
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, msg2);
            }
        }
    },
    deleteProductSize(payload, msg1, msg2, msg3) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: msg1,
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/product-profile/remove-size', payload);
                        dispatch(productMutations.setProductData(response.data.data));
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
    addProductTag(payload,msg1,msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/product-profile/add-tag', payload);
                dispatch(productMutations.setProductData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: msg1
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, msg2);
            }
        }
    },
    deleteProductTag(payload,msg1,msg2,msg3) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: msg1,
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/product-profile/remove-tag', payload);
                        dispatch(productMutations.setProductData(response.data.data));
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
    refillProductQuantity(payload, afterSuccess, msg1, msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/product-profile/refill-quantity', payload);
                dispatch(productMutations.setProductData(response.data.data));
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
    decreaseQuantity(payload, afterSuccess,msg1, msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/product-profile/decrease-quantity', payload);
                dispatch(productMutations.setProductData(response.data.data));
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
    addProductImage(payload, msg1, msg2) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/product-profile/add-img', payload);
                dispatch(productMutations.setProductData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: msg1
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, msg2);
            }
        }
    },
    deleteProductImage(payload, msg1, msg2, msg3) {
        return async (dispatch) => {
            dispatch(popupMutation.clearPopPanel());
            dispatch(stickyMutations.popAllNotes());
            dispatch(popupMutation.popQuestion({
                msg: msg1,
                onSubmit: async () => {
                    try {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/product-profile/remove-img', payload);
                        dispatch(productMutations.setProductData(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: msg2
                        }));
                    } catch (error) {
                        
                        errorHandler(dispatch, error.response, msg3);
                    }
                }
            }));
        }
    }
}

export default productActions;
