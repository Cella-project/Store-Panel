import React from "react";

import { useSelector } from 'react-redux';

import LoadingPopup from './LoadingPopup';
import FeedbackPopup from './FeedbackPopup';
import QuestionPopup from './QuestionPopup';

import style from './Popup.module.scss';

const Popup = () => {
    const showLoadingPop = useSelector(state => state.popup.loadingPop.shown);
    const showFeedbackPop = useSelector(state => state.popup.feedbackPop.shown);
    const showQuestionPop = useSelector(state => state.popup.questionPop.shown);

    return (
        <div className={`${style['panel']} flex-col-center`}>
            {showLoadingPop && <LoadingPopup />}
            {showFeedbackPop && <FeedbackPopup />}
            {showQuestionPop && <QuestionPopup />}
        </div>
    );
};

export default Popup;