import Axios from '../AxiosInstance';

import { specialityControlMutations, popupMutation, stickyMutations } from '../../redux/mutations';
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
    addColor(color, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post(`api/color-list/color`, color);
                dispatch(specialityControlMutations.addColor(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Color added successfully'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    updateColor(color, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put(`api/color-list/color`, color);
                dispatch(specialityControlMutations.updateColor(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Color updated successfully'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    deleteColor(colorId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this color?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`api/color-list/color/${colorId}`);
                        dispatch(specialityControlMutations.deleteColor(colorId));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.pushNote({
                            type: 'success',
                            msg: 'Color deleted successfully'
                        }));
                    }
                }));
            } catch (error) {
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
    addTag(tag, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post(`api/tag-list/tag`, tag);
                dispatch(specialityControlMutations.addTag(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Tag added successfully'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    updateTag(tag, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put(`api/tag-list/tag`, tag);
                dispatch(specialityControlMutations.updateTag(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Tag updated successfully'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    deleteTag(tagId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this tag?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`api/tag-list/tag/${tagId}`);
                        dispatch(specialityControlMutations.deleteTag(tagId));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.pushNote({
                            type: 'success',
                            msg: 'Tag deleted successfully'
                        }));
                    }
                }));
            } catch (error) {
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
    addMaterial(material, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post(`api/material-list/material`, material);
                dispatch(specialityControlMutations.addMaterial(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Material added successfully'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    updateMaterial(material, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put(`api/material-list/material`, material);
                dispatch(specialityControlMutations.updateMaterial(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Material updated successfully'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    deleteMaterial(materialId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this material?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`api/material-list/material/${materialId}`);
                        dispatch(specialityControlMutations.deleteMaterial(materialId));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.pushNote({
                            type: 'success',
                            msg: 'Material deleted successfully'
                        }));
                    }
                }));
            } catch (error) {
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
    addSize(size, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.post(`api/size-list/size`, size);
                dispatch(specialityControlMutations.addSize(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Size added successfully'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    updateSize(size, afterSuccess) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.put(`api/size-list/size`, size);
                dispatch(specialityControlMutations.updateSize(response.data.data));
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.pushNote({
                    type: 'success',
                    msg: 'Size updated successfully'
                }));
                afterSuccess();
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    deleteSize(sizeId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this size?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`api/size-list/size/${sizeId}`);
                        dispatch(specialityControlMutations.deleteSize(sizeId));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.pushNote({
                            type: 'success',
                            msg: 'Size deleted successfully'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    
}


export default specialityControlActions;