import Axios from '../AxiosInstance';
import { subCategoryMutations } from '../../redux/mutations';
import errorHandler from '../../services/errorHandler';

const subCategoryActions = {
    getSubCategories(payload) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/category-main/category-sub-categories/${payload}`);
                dispatch(subCategoryMutations.setSubCategories(response.data.data));
            } catch (error) {
                dispatch(subCategoryMutations.setSubCategories([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getSubCategoryById(payload) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/category-main/category/${payload}`);
                dispatch(subCategoryMutations.setSubCategoryData(response.data.data));
            } catch (error) {
                dispatch(subCategoryMutations.setSubCategoryData(null));
                errorHandler(dispatch, error.response);
            }
        }
    }
}

export default subCategoryActions;
