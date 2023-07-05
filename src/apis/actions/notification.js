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

                const response = await Axios.get(`/api/notification-center/notifications?skip=${offset}&limit=10`);

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
    setNotificationAsRead(notificationId) {
        return async (dispatch) => {
            try {
                const response = await Axios.put('/api/notification-center/mark-read', { "_id": notificationId });
                dispatch(notificationMutations.updateNotification(response.data.data));
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    setAllNotificationsAsRead(userId) {
        return async (dispatch) => {
            try {
                await Axios.put('/api/notification-center/mark-all-read', { "userId": userId });
                dispatch(notificationMutations.setNotifications(null));
                dispatch(this.getAllNotifications(0));
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    }
}

export default notificationActions;