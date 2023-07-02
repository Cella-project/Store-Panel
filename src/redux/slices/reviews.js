import {createSlice} from '@reduxjs/toolkit';

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviews: null,
    },
    reducers: {
        setReviews(state, action) {
            state.reviews = action.payload;
        },
        changeReviewState(state, action) {
            const updatedReview = action.payload;
            const existingReviewIndex = state.reviews.findIndex(
                (review) => review._id === updatedReview._id
            );
            if (existingReviewIndex !== -1) {
                state.reviews[existingReviewIndex] = updatedReview;
            }
        },
        deleteReview(state, action) {
            const deletedReviewId = action.payload || action;
            return {
                ...state,
                reviews: state.reviews.filter(review => review._id !== deletedReviewId)
            };
        }
    }
});

export default reviewSlice;

