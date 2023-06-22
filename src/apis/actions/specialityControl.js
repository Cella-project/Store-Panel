import Axios from '../AxiosInstance';

import { specialityControlMutations } from '../../redux/mutations';
import errorHandler from '../../services/errorHandler';

const specialityControlActions = {
    getColors(specialityId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`api/color-list/speciality-colors/${specialityId}`);
                dispatch(specialityControlMutations.setColors(response.data.data));
            } catch (error) {
                dispatch(specialityControlMutations.setColors(null));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getTags(specialityId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`api/tag-list/speciality-tags/${specialityId}`);
                dispatch(specialityControlMutations.setTags(response.data.data));
            } catch (error) {
                dispatch(specialityControlMutations.setTags(null));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getMaterials(specialityId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`api/material-list/speciality-materials/${specialityId}`);
                dispatch(specialityControlMutations.setMaterials(response.data.data));
            } catch (error) {
                dispatch(specialityControlMutations.setMaterials(null));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getSizes(specialityId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`api/size-list/speciality-sizes/${specialityId}`);
                dispatch(specialityControlMutations.setSizes(response.data.data));
            } catch (error) {
                dispatch(specialityControlMutations.setSizes(null));
                errorHandler(dispatch, error.response);
            }
        }
    },
}


export default specialityControlActions;