import Axios from '../AxiosInstance';
import errorHandler from '../../services/errorHandler';

import { reviewMutations, popupMutation, stickyMutations } from '../../redux/mutations';

const reviewActions = {
    getReviewsForProduct(productId) {
        return async (dispatch) => {
            try {
                const response = await Axios.get(`/api/review-main/product-reviews/${productId}`);
                dispatch(reviewMutations.setReviews(response.data.data));
            }
            catch (error) {
                dispatch(reviewMutations.setReviews([]));
                errorHandler(dispatch, error.response);
            }
        }
    },
    getReviewsForOrder(orderId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popLoading());
                const response = await Axios.get(`/api/review-main/order/${orderId}`);
                dispatch(reviewMutations.setReviews(response.data.data));
                dispatch(popupMutation.clearPopPanel());
            } catch (error) {
                dispatch(reviewMutations.setReviews(null));
                errorHandler(dispatch, error.response);
            }
        }
    },
    changeReviewState(reviewId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to change the state of this review?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        const response = await Axios.put(`/api/review-main/change-state`, { "_id": reviewId });
                        dispatch(reviewMutations.changeReviewState(response.data.data));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Review state changed successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    },
    deleteReview(reviewId) {
        return async (dispatch) => {
            try {
                dispatch(popupMutation.clearPopPanel());
                dispatch(stickyMutations.popAllNotes());
                dispatch(popupMutation.popQuestion({
                    msg: 'Are you sure you want to delete this review?',
                    onSubmit: async () => {
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(popupMutation.popLoading());
                        await Axios.delete(`/api/review-main/review/${reviewId}`);
                        dispatch(reviewMutations.deleteReview(reviewId));
                        dispatch(popupMutation.clearPopPanel());
                        dispatch(stickyMutations.pushNote({
                            type: 'success',
                            msg: 'Review deleted successfully.'
                        }));
                    }
                }));
            } catch (error) {
                errorHandler(dispatch, error.response);
            }
        }
    }
}

export default reviewActions;