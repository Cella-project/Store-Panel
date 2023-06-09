import React from "react";

import { Outlet } from "react-router-dom";
import languages from "../components/global/languages";
import { useSelector } from "react-redux";
// import AuthImg from '../assets/images/auth-img.png';
import logo from '../assets/images/white-logo.png';

import style from './Auth.module.scss';

const Auth = () =>  {
    const language = useSelector(state => state.language.language);
    const translations = languages[language];
    return (
        <div className={`${style['auth']} full-width`}>
            <div className={`${style['auth--header']} flex-row-between`}>
                <div className={`${style['auth--header--tag']} flex-row-center orange-bg shadow-5px`}>
                    <img src={logo} alt='ACTORE' className={style['auth--header--tag--logo']} />
                </div>
            </div>
            <div className={`${style['auth--body']} full-width flex-row2col`}>
                {/* <img className={style['auth--body--img']} src={AuthImg} alt="auth-img" /> */}
                <Outlet />
            </div>
            <div className={`${style['auth--sign']} full-width flex-row-center inter orange size-12px`}>
                {translations.allRightsReserved} <i className="bi bi-suit-heart-fill margin-4px-H"></i> {translations.ACTORE}
            </div>
        </div>
    );
};

export default Auth;