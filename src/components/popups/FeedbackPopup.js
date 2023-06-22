import React from "react";

import { useSelector, useDispatch } from 'react-redux';

import { popupMutation } from '../../redux/mutations';

import style from './FeedbackPopup.module.scss';
import languages from "../global/languages";
const FeedbackPopup = () => {
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.language);
    const translate = languages[language];
    const feedbackPop = useSelector(state => state.popup.feedbackPop);

    const clickHandler = () => {
        dispatch(popupMutation.clearPopPanel());
    };

    return (
        <div className={`${style['pop-up']} white-bg radius-10px shadow-5px`}>
        <div className="full-width-cont flex-row-left-start">
            {feedbackPop.type === 'success' && <i className={`bi bi-patch-check ${style['pop-up--icon']} ${style['pop-up--icon--info']} green`}></i>}
            {feedbackPop.type === 'info' && <i className={`bi bi-exclamation-octagon ${style['pop-up--icon']} ${style['pop-up--icon--info']} baby-blue`}></i>}
            {feedbackPop.type === 'error' && <i className={`bi bi-x-octagon ${style['pop-up--icon']} ${style['pop-up--icon--error']} red`}></i>}
            <p className="inter gray">{ feedbackPop.msg }</p>
        </div>
        <div className="full-width-cont flex-col-center">
            <button onClick={clickHandler} className={`${style['pop-up--btn']} ${feedbackPop.type === 'success' ? 'green-bg' : feedbackPop.type === 'info' ? 'baby-blue-bg' : feedbackPop.type === 'error' ? 'red-bg' : ''} inter white radius-5px`}>{translate.ok}</button>
        </div>
    </div>
    );
};

export default FeedbackPopup;