import Axios from '../AxiosInstance';
import { mainCategoryMutations, popupMutation, stickyMutations } from '../../redux/mutations';
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
    addMainCategoryPicture(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/file-manager/file', payload);
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Main category picture added successfully.'
                }));
                afterSuccess(response);
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    addMainCategory(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/category-main/category', payload);
                dispatch(mainCategoryMutations.addMainCategory(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Main category added successfully.'
                }))
                afterSuccess(response);
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    updateMainCategory(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/category-main/category', payload);
                dispatch(mainCategoryMutations.updateMainCategory(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Main category updated successfully.'
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    deleteMainCategory(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this main category?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`/api/category-main/category/${payload}`);
                        dispatch(mainCategoryMutations.deleteMainCategory(payload));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Main category deleted successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    changeMainCategoryState(categoryId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to change this main category state?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/category-main/change-state', { _id: categoryId });
                        dispatch(mainCategoryMutations.changeMainCategoryState(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Main category state changed successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
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
