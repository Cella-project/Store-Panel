import Axios from '../AxiosInstance';
import { mainCategoryMutations } from '../../redux/mutations';
import errorHandler from '../../services/errorHandler';

const mainCategoryActions = {
    getMainCategories(payload) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/category-main/speciality-main-categories/${payload}`);
                dispatch(mainCategoryMutations.setMainCategories(response.data.data));
            } catch (error) {
                dispatch(mainCategoryMutations.setMainCategories([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getMainCategoryById(payload) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/category-main/category/${payload}`);
                dispatch(mainCategoryMutations.setMainCategoryData(response.data.data));
            } catch (error) {
                dispatch(mainCategoryMutations.setMainCategoryData(null));
                errorHandler(dispatch, error.response);
            }
        }
    }
}

export default mainCategoryActions;
