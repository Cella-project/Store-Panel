import Axios from '../AxiosInstance';
import errorHandler from '../../services/errorHandler';

import { orderHistoryMutations,popupMutation, stickyMutations } from '../../redux/mutations';

const orderHistoryActions = {
    getOrderHistory() {
        return async (dispatch) => {
            try {
                const response = await Axios.get('/api/order-history/orders');
                dispatch(orderHistoryMutations.setOrderHistory(response.data.data));
            } catch (error) {
                dispatch(orderHistoryMutations.setOrderHistory([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getOrderHistoryForCustomer(customerId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/order-history/customer-orders/${customerId}`);
                dispatch(orderHistoryMutations.setOrderHistory(response.data.data));
            } catch (error) {
                dispatch(orderHistoryMutations.setOrderHistory([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getOrderHistoryForStore(storeId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/order-history/store-orders/${storeId}`);
                dispatch(orderHistoryMutations.setOrderHistory(response.data.data));
            } catch (error) {
                dispatch(orderHistoryMutations.setOrderHistory([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getOrderHistoryForDriver(driverId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/order-history/driver-orders/${driverId}`);
                dispatch(orderHistoryMutations.setOrderHistory(response.data.data));
            } catch (error) {
                dispatch(orderHistoryMutations.setOrderHistory([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getOrderHistoryData(orderId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.get(`/api/order-history/order/${orderId}`);
                dispatch(orderHistoryMutations.setOrderHistoryData(response.data.data));
                dispatch(popupMutation.clearPopPanel());
            } catch (error) {
                dispatch(orderHistoryMutations.setOrderHistoryData(null));
                errorHandler(dispatch, error.response);
            }
        }
    },
}

export default orderHistoryActions;