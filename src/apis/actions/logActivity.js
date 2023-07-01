import Axios from '../AxiosInstance';
import errorHandler from '../../services/errorHandler';

import store from '../../redux/index';

import { logActivityMutations } from '../../redux/mutations';

const logActivityActions = {
    getLogs(storeId, offset) {
        return async (dispatch) => {
            try {
                let logs = store.getState().log.logs;
                if (logs === null) {
                    logs = [];
                }

                const response = await Axios.get(`/api/log-archive/store-logs/${storeId}?skip=${offset}&limit=10`);

                const newLogs = [...logs, ...response.data.data];

                if (response.data.data.length > 0) {
                    dispatch(logActivityMutations.setLogs(newLogs));
                }
                if (response.data.data.length === 0 && logs.length === 0) {
                    dispatch(logActivityMutations.setLogs([]));
                }
            } catch (error) {
                dispatch(logActivityMutations.setLogs([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
}

export default logActivityActions;