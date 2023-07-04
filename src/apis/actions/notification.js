import Axios from '../AxiosInstance';
import errorHandler from '../../services/errorHandler';

import store from '../../redux/index';

import { notificationMutations } from '../../redux/mutations';

const notificationActions = {
    getAllNotifications(offset) {
        return async (dispatch) => {
            try {
                let notifications = store.getState().notification.notifications;
                if (notifications === null) {
                    notifications = [];
                }

                const response = await Axios.get(`/api/notification-center/get-all-notifications?skip=${offset}&limit=4`);

                const newNotifications = [...notifications, ...response.data.data];

                if (response.data.data.length > 0) {
                    dispatch(notificationMutations.setNotifications(newNotifications));
                }
                if (response.data.data.length === 0 && notifications.length === 0) {
                    dispatch(notificationMutations.setNotifications([]));
                }
            } catch (error) {
                dispatch(notificationMutations.setNotifications([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    registerToken(token) {
        return async (dispatch) => {
            try {
                await Axios.post('/api/notification-center/register-token', { token });
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
}

export default notificationActions;