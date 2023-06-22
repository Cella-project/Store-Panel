import Axios from '../AxiosInstance';
import { specialityMutations } from '../../redux/mutations';
import errorHandler from '../../services/errorHandler';

const specialityActions = {
    getSpecialties() {
        return async (dispatch) => {
            try {
                const response = await Axios.get('/api/speciality-main/specialities');
                dispatch(specialityMutations.setSpecialties(response.data.data));
            } catch (error) {
                dispatch(specialityMutations.setSpecialties([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getspecialityData(specialityId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/speciality-main/speciality/${specialityId}`);
                dispatch(specialityMutations.setspecialityData(response.data.data));
            } catch (error) {
                dispatch(specialityMutations.setspecialityData(null));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getCategoryData(categoryId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/category-main/category/${categoryId}`);
                dispatch(specialityMutations.setCategoryData(response.data.data));
            } catch (error) {
                dispatch(specialityMutations.setCategoryData(null));
                errorHandler(dispatch, error.response);
            }
        }
    }
}

export default specialityActions;