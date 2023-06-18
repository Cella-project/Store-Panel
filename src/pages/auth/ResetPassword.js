import React, { useState,useEffect } from "react";

import { NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../apis/actions';

import { useFormik } from 'formik';
import { resetPasswordSchema } from '../../validations/auth/resetPasswordSchema';
import languages from "../../components/global/languages";

import style from './ResetPassword.module.scss';

const ResetPassword = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmShown, setConfirmShown] = useState(false);
    const mode = useSelector(state => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translations = languages[language];

    const dispatch = useDispatch();

    const forgetPasswordData = useSelector(state => state.auth.forgetPasswordCycle);

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            password: '',
            confirm: ''
        },
        validationSchema: resetPasswordSchema,
        onSubmit(values, actions) {
            dispatch(authActions.resetPassword({
                email: forgetPasswordData.email,
                otp: `${forgetPasswordData.OTP}`,
                newPassword: values.password
            }));
        }
    });
    
    useEffect(() => {
        document.title = 'Reset Password • Store Panel';
    }, []);

    return (
        <form onSubmit={handleSubmit} noValidate className={`${style['reset']} flex-col-center white-bg radius-5px shadow-2px`}>
            <div className={`${language === 'ar' ? style['arabic-reset--info'] : style['reset--info']} full-width flex-col-left-start ${mode === 'dark-mode' ? 'gray-bg' : 'off-gray-bg'} radius-5px`}>
                <p className={`space-none inter ${mode === 'dark-mode' ? 'white' : 'gray'} margin-4px-V size-12px`}>{translations.enterNewPassword}</p>
            </div>
            <div className={`${language === 'ar' ? style['arabic-reset--slot'] : style['reset--slot']} full-width flex-col-left-start margin-4px-V`}>
                <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.newPassword}</p>
                <i className={`${language === 'ar' ? style['arabic-reset--slot--icon'] : style['reset--slot--icon']} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-key`}></i>
                <i className={`${language === 'ar' ? style['arabic-reset--slot--icon--left'] : style['reset--slot--icon--right']} bi bi-eye${!passwordShown ? "-slash" : ""} size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'mint-green'}`} onClick={() => setPasswordShown(!passwordShown)} />
                <input
                    className={`${language === 'ar' ? style['arabic-reset--slot--input'] : style['reset--slot--input']} ${errors.password && touched.password ? style['reset--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    autoComplete="off"
                    autoFocus
                    placeholder="Enter your new password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <p style={{ marginLeft: '5px', visibility: errors.password && touched.password ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {errors.password}
                </p>
            </div>
            <div className={`${language === 'ar' ? style['arabic-reset--slot'] : style['reset--slot']} full-width flex-col-left-start margin-4px-V`}>
                <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.confirmNewPassword}</p>
                <i className={`${language === 'ar' ? style['arabic-reset--slot--icon'] : style['reset--slot--icon']} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-key`}></i>
                <i className={`${language === 'ar' ? style['arabic-reset--slot--icon--left'] : style['reset--slot--icon--right']} bi bi-eye${!confirmShown ? "-slash" : ""} size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'mint-green'}`} onClick={() => setConfirmShown(!confirmShown)} />
                <input
                    className={`${language === 'ar' ? style['arabic-reset--slot--input'] : style['reset--slot--input']} ${errors.confirm && touched.confirm ? style['reset--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
                    type={confirmShown ? "text" : "password"}
                    name="confirm"
                    autoComplete="off"
                    placeholder="Confirm your new password"
                    value={values.confirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <p style={{ marginLeft: '5px', visibility: errors.confirm && touched.confirm ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
                    <i className="bi bi-exclamation-triangle-fill red"></i> {errors.confirm}
                </p>
            </div>
            <button type="submit" className={`${style['reset--btn']} full-width mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>{translations.resetPassword}</button>
            <div className="full-width flex-row-left-start">
                <NavLink to={'/auth/forget-password'} style={{ textDecoration: 'none' }} className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-14px margin-12px-H pointer`}>{translations.back}</NavLink>
            </div>
        </form>
    );
};

export default ResetPassword;