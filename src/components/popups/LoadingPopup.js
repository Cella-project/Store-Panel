import React from "react";

import Spinner from '../global/Spinner';
import { useSelector } from "react-redux";
import style from './LoadingPopup.module.scss';
import languages from "../global/languages";
const LoadingPopup = () => {
    const language = useSelector(state => state.language.language);
    const translate = languages[language];

    return (
        <div className={`${style['pop-up']} flex-col-center white-bg radius-20px shadow-5px`}>
            <Spinner />
            <p className="inter gray no-margin no-padding">{translate.pleaseWait}</p>
        </div>
    );
};

export default LoadingPopup;