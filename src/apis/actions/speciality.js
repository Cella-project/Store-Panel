import Axios from '../AxiosInstance';
import { specialityMutations, popupMutation, stickyMutations } from '../../redux/mutations';
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
    addspeciality(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post('/api/speciality-main/speciality', payload);
                dispatch(specialityMutations.addspeciality(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'speciality added successfully.'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    updatespeciality(payload, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put('/api/speciality-main/speciality', payload);
                dispatch(specialityMutations.updatespeciality(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'speciality updated successfully.'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    changespecialityState(specialityId, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to change the state of this specialty?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put(`/api/speciality-main/change-state`, { _id: specialityId });
                        dispatch(specialityMutations.changespecialityState(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'speciality state changed successfully.'
                        }));
                        afterSuccess();
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
            }
        }
    },
    deletespeciality(specialityId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this specialty?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`/api/speciality-main/speciality/${specialityId}`);
                        dispatch(specialityMutations.deletespeciality(specialityId));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'speciality deleted successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response, 'Something went wrong, please try again.');
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