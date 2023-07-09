import React, { useState, useEffect } from "react";

import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../apis/actions';
import useInput from '../../hooks/useInput';
import languages from "../../components/global/languages";

import style from './ResetPassword.module.scss';

const ResetPassword = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmedPasswordShown, setConfirmedPasswordShown] = useState(false);
    const mode = useSelector(state => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translations = languages[language];
    const email = useSelector((state) => state.auth.forgetPasswordCycle.email);
    const OTP = useSelector((state) => state.auth.forgetPasswordCycle.OTP);

    const dispatch = useDispatch();


    useEffect(() => {
        document.title = 'Reset Password • Store Panel';
    }, []);

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        error: passwordError,
        isTouched: passwordIsTouched,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&./_=+^])[A-Za-z\d@$!%*#?&./_=+^]{8,}$/;
        const isValid = regex.test(value);
        let error = '';
        if (value.trim() === '') {
            error = translations.passwordRequired;
        } else if (!isValid) {
            error = translations.passwordCurrentMatch;
        }
        return { isValid, error };
    });

    const {
        value: confirmedPassword,
        isValid: confirmedPasswordIsValid,
        error: confirmedPasswordError,
        isTouched: confirmedPasswordIsTouched,
        valueChangeHandler: confirmedPasswordChangedHandler,
        inputBlurHandler: confirmedPasswordBlurHandler,
    } = useInput((value) => {
        let error = "";
        if (value !== enteredPassword) {
            error = translations.passwordDoNotMatch;
        }
        return { isValid: !error, error };
    });

    let formIsValid = false;
    if (!enteredPasswordIsValid || !confirmedPasswordIsValid || confirmedPassword !== enteredPassword) {
        formIsValid = true;
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (formIsValid) {
            return;
        }
        const formData = {
            email: email,
            otp: OTP,
            newPassword: enteredPassword,
        };

        dispatch(authActions.resetPassword(formData, translations.yourPasswordChangedSuccessfully));
    };

    return (
        <form onSubmit={handleResetPassword} noValidate className={`${style['reset']} flex-col-center white-bg radius-5px shadow-2px`}>
            <div className={`${language === 'ar' ? style['arabic-reset--info'] : style['reset--info']} full-width flex-col-left-start ${mode === 'dark-mode' ? 'gray-bg' : 'off-gray-bg'} radius-5px`}>
                <p className={`space-none inter ${mode === 'dark-mode' ? 'white' : 'gray'} margin-4px-V size-12px`}>{translations.enterNewPassword}</p>
            </div>
            <div className={`${language === 'ar' ? style['arabic-reset--slot'] : style['reset--slot']} full-width flex-col-left-start margin-4px-V`}>
                <p style={{ marginLeft: '0 5px 0 5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.newPassword}</p>
                <i className={`${language === 'ar' ? style['arabic-reset--slot--icon'] : style['reset--slot--icon']} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-key`}></i>
                <i className={`${language === 'ar' ? style['arabic-reset--slot--icon--left'] : style['reset--slot--icon--right']} bi bi-eye${!passwordShown ? "-slash" : ""} size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'mint-green'}`} onClick={() => setPasswordShown(!passwordShown)} />
                <input
                    className={`${language === 'ar' ? style['arabic-reset--slot--input'] : style['reset--slot--input']} ${passwordError && passwordIsTouched ? style['reset--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    autoComplete="off"
                    autoFocus
                    placeholder={translations.enterNewPassword}
                    value={enteredPassword}
                    onChange={passwordChangedHandler}
                    onBlur={passwordBlurHandler}
                />
                <p style={{ marginLeft: '0 5px 0 5px', visibility: passwordError && passwordIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {passwordError}
                </p>
            </div>
            <div className={`${language === 'ar' ? style['arabic-reset--slot'] : style['reset--slot']} full-width flex-col-left-start margin-4px-V`}>
                <p style={{ marginLeft: '0 5px 0 5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.confirmNewPassword}</p>
                <i className={`${language === 'ar' ? style['arabic-reset--slot--icon'] : style['reset--slot--icon']} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-key`}></i>
                <i className={`${language === 'ar' ? style['arabic-reset--slot--icon--left'] : style['reset--slot--icon--right']} bi bi-eye${!confirmedPasswordShown ? "-slash" : ""} size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'mint-green'}`} onClick={() => setConfirmedPasswordShown(!confirmedPasswordShown)} />
                <input
                    className={`${language === 'ar' ? style['arabic-reset--slot--input'] : style['reset--slot--input']} ${confirmedPasswordError && confirmedPasswordIsTouched ? style['reset--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
                    type={confirmedPasswordShown ? "text" : "password"}
                    name="confirm"
                    autoComplete="off"
                    placeholder={translations.confirmNewPassword}
                    value={confirmedPassword}
                    onChange={(event) => {
                        confirmedPasswordChangedHandler(event);
                    }}
                    onBlur={confirmedPasswordBlurHandler}
                />
                <p style={{ marginLeft: '0 5px 0 5px', visibility: confirmedPasswordError && confirmedPasswordIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {confirmedPasswordError}
                </p>
            </div>
            <button type="submit" className={`${style['reset--btn']} full-width mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>{translations.resetPassword}</button>
            <div className="full-width flex-row-left-start">
                <NavLink to={'/store-panel/auth/forget-password'} style={{ textDecoration: 'none' }} className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-14px margin-12px-H pointer`}>{translations.back}</NavLink>
            </div>
        </form>
    );
};

export default ResetPassword;