import Axios from '../AxiosInstance';
import errorHandler from '../../services/errorHandler';

import { orderMutations, popupMutation, stickyMutations } from '../../redux/mutations';

const orderActions = {
    getOrder() {
        return async (dispatch) => {
            try {
                const response = await Axios.get('/api/order-main/orders');
                dispatch(orderMutations.setOrder(response.data.data));
            } catch (error) {
                dispatch(orderMutations.setOrder([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getOrderForCustomer(customerId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/order-main/customer-orders/${customerId}`);
                dispatch(orderMutations.setOrder(response.data.data));
            } catch (error) {
                dispatch(orderMutations.setOrder([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getOrderForStore(storeId) {
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
    getOrderForDriver(driverId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/order-main/driver-orders/${driverId}`);
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
    editOrderData(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/order-main/order', payload);
                dispatch(orderMutations.setOrderData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Order updated successfully.'
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    deleteOrder(orderId,afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                await Axios.delete(`/api/order-main/order/${orderId}`);
                dispatch(orderMutations.deleteOrder(orderId));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Order deleted successfully.'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
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
                    onsubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/order-operation/canceled-by-admin', {_id: orderId});
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
    }
}

export default orderActions;