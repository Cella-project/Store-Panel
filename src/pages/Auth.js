import React from "react";

import { Outlet } from "react-router-dom";
import languages from "../components/global/languages";
import { useSelector } from "react-redux";
import AuthImg from '../assets/images/auth-img.png';
import AuthImgDark from '../assets/images/auth-img-dark.png';

import logo from '../assets/images/white-logo.png';

import style from './Auth.module.scss';

const Auth = () =>  {
    const language = useSelector(state => state.language.language);
    const translations = languages[language];
    const mode = useSelector(state => state.theme.mode);

    return (
        <div className={`${style['auth']} ${mode === 'dark-mode' ? 'dark-mode' : ''} full-width`}>
            <div className={`${style['auth--header']} flex-row-between`}>
                <div className={`${style['auth--header--tag']} flex-row-center mint-green-bg shadow-5px`}>
                    <img src={logo} alt='ACTORE' className={style['auth--header--tag--logo']} />
                </div>
            </div>
            <div className={`${style['auth--body']} full-width flex-row2col`}>
                <img className={style['auth--body--img']} src={mode === 'dark-mode' ? AuthImgDark : AuthImg} alt="auth-img" />
                <Outlet />
            </div>
            <div className={`${style['auth--sign']} full-width flex-row-center inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-12px`}>
                {translations.allRightsReserved} <i className="bi bi-suit-heart-fill margin-4px-H"></i> {translations.ACTORE}
            </div>
        </div>
    );
};

export default Auth;