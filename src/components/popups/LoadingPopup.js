import React from "react";

import Spinner from '../global/Spinner';

import style from './LoadingPopup.module.scss';

const LoadingPopup = () => {
    return (
        <div className={`${style['pop-up']} flex-col-center white-bg radius-20px shadow-5px`}>
            <Spinner />
            <p className="inter gray no-margin no-padding">Please Wait ...</p>
        </div>
    );
};

export default LoadingPopup;