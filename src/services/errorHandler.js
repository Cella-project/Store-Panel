import { stickyMutations, popupMutation } from '../redux/mutations';

const errorHandler = (dispatch, error, errorMessage) => {
    dispatch(stickyMutations.popAllNotes());
    dispatch(popupMutation.clearPopPanel());

    if (error) {
        if (error.status === 422) {
            dispatch(stickyMutations.pushNote({
                type: 'alert',
                msg: errorMessage || error.data.message
            }));
        } else {
            dispatch(popupMutation.popFeedBack({
                type: 'error',
                msg: errorMessage || error.data.message
            }));
        }
    } else {
        dispatch(popupMutation.popFeedBack({
            type: 'error',
            msg: 'Sorry for that inconvenient error, we are facing some troubles and working to fix them.'
        }));
    }
}

export default errorHandler;