import Axios from '../AxiosInstance';
import errorHandler from '../../services/errorHandler';

import { orderMutations, popupMutation, stickyMutations } from '../../redux/mutations';

const orderActions = {
    getOrder(storeId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/order-main/store-orders/${storeId}`);
                dispatch(orderMutations.setOrder(response.data.data));
            } catch (error) {
                dispatch(orderMutations.setOrder([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getOrderData(orderId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.get(`/api/order-main/order/${orderId}`);
                dispatch(orderMutations.setOrderData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
            } catch (error) {
                dispatch(orderMutations.setOrderData(null));
                errorHandler(dispatch, error.response);
            }
        }
    },
    cancelOrder(orderId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to cancel this order?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/order-operation/canceled-by-store', {_id: orderId});
                        dispatch(orderMutations.setOrderData(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Order cancelled successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    approveOrder(orderId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to approve this order?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/order-operations/approve', {_id: orderId});
                        dispatch(orderMutations.setOrderData(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Order approved successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    readyForPickup(orderId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to mark this order as ready for pickup?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/order-operations/ready', {_id: orderId});
                        dispatch(orderMutations.setOrderData(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Order marked as ready for pickup successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    }
}

export default orderActions;