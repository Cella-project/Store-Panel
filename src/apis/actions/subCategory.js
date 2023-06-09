import Axios from '../AxiosInstance';
import AxiosFileManager from '../AxiosFileManager';
import { subCategoryMutations, popupMutation, stickyMutations } from '../../redux/mutations';
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
    addSubCategoryPicture(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await AxiosFileManager.post('/api/file-manager/file', payload);
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Sub Category picture added successfully.'
                }));
                afterSuccess(response);
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    addSubCategory(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/category-main/category', payload);
                dispatch(subCategoryMutations.addSubCategory(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Sub Category added successfully.'
                }))
                afterSuccess(response);
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    updateSubCategory(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/category-main/category', payload);
                dispatch(subCategoryMutations.updateSubCategory(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Sub Category updated successfully.'
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    deleteSubCategory(payload) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this sub category?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`/api/category-main/category/${payload}`);
                        dispatch(subCategoryMutations.deletesubCategory(payload));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Sub Category deleted successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    changeSubCategoryState(categoryId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to change this sub category state?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put('/api/category-main/change-state', { _id: categoryId });
                        dispatch(subCategoryMutations.changeSubCategoryState(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Sub Category state changed successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
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
