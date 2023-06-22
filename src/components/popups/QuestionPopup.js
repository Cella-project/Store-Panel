import React from "react";

import { useSelector, useDispatch } from 'react-redux';

import { popupMutation } from '../../redux/mutations';

import style from './QuestionPopup.module.scss';
import languages from "../global/languages";
const QuestionPopup = () => {
    const dispatch = useDispatch();
    const language = useSelector(state => state.language.language);
    const translate = languages[language];

    const questionPop = useSelector(state => state.popup.questionPop);

    const answerHandler = (ans) => {
        if (ans) {
            questionPop.onSubmit();
        } else {
            dispatch(popupMutation.clearPopPanel());
        }
    };

    return (
        <div className={`${style['pop-up']} white-bg radius-10px`}>
            <div className="full-width-cont flex-row-between">
                <i className={`bi bi-question-octagon ${style['pop-up--icon']} gold`}></i>
                <p className="inter gray">{ questionPop.msg }</p>
            </div>
            <div className={`${style['pop-up--btns']} full-width-cont flex-row-between`}>
                <button onClick={answerHandler.bind(null, true)} className={`${style['pop-up--btns--btn']} inter white green-bg radius-5px`}>{translate.yes}</button>
                <button onClick={answerHandler.bind(null, false)} className={`${style['pop-up--btns--btn']} inter white red-bg radius-5px`}>{translate.no}</button>
            </div>
        </div>
    );
};

export default QuestionPopup;