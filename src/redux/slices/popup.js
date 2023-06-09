import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
    name: 'popup',
    initialState: {
        popPanelShown: false,
        loadingPop: {
            shown: false
        },
        feedbackPop: {
            shown: false,
            type: '',
            msg: ''
        },
        questionPop: {
            shown: false,
            op: '',
            payload: null,
            msg: ''
        }
    },
    reducers: {
        clearPopPanel(state) {
            state.popPanelShown = false;
            state.loadingPop = {
                shown: false
            };
            state.feedbackPop = {
                shown: false,
                type: '',
                msg: ''
            };
            state.questionPop = {
                shown: false,
                op: '',
                payload: null,
                msg: ''
            };
        },
        popLoading(state) {
            state.popPanelShown = true;
            state.loadingPop = {
                shown: true
            };
        },
        popFeedBack(state, action) {
            state.popPanelShown = true;
            state.feedbackPop = {
                shown: true,
                type: action.payload.type,
                msg: action.payload.msg
            };
        },
        popQuestion(state, action) {
            state.popPanelShown = true;
            state.questionPop = {
                shown: true,
                op: action.payload.op,
                payload: action.payload.payload,
                msg: action.payload.msg
            };
        }
    }
});

export default popupSlice;