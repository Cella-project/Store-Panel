import React from "react";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../apis/actions';
import useInput from '../../hooks/useInput';
import style from './ForgetPassword.module.scss';
import languages from '../../components/global/languages';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);
  const language = useSelector(state => state.language.language);
  const translations = languages[language];

  const {
    value: enteredEmail,
    error: emailError,
    isTouched: emailIsTouched,
    valueChangeHandler: emailChangedHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(value);
    let error = '';
    if (value.trim() === '') {
      error = translations.emailIsRequire;
    } else if (!isValid) {
      error = translations.pleaseEnterValidEmail;
    }
    return { isValid, error };
  });

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const formData = {
      email: enteredEmail.trim().toLowerCase(),
    };
    dispatch(authActions.forgetPassword(formData, translations.checkYourEmailWeSentYouOTPToResetPassword));
  };


  return (
    <form onSubmit={handleForgetPassword} noValidate className={`${style['forget']} flex-col-center white-bg radius-5px shadow-2px`}>
      <div className={`${language === 'ar' ? style['arabic-forget--info'] : style['forget--info']} full-width flex-col-left-start ${mode === 'dark-mode' ? 'gray-bg' : 'off-gray-bg'} margin-10px-V radius-5px`}>
        <p className={`space-none inter ${mode === 'dark-mode' ? 'white' : 'gray'} margin-4px-V size-12px`}>{translations.pleaseEnterEmail}</p>
      </div>
      <div className={`${language === 'ar' ? style['arabic-forget--slot'] : style['forget--slot']} full-width flex-col-left-start margin-4px-V`}>
        <p style={{ marginLeft: '0 5px 0 5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.emailAddress}</p>
        <i className={`${language === 'ar' ? style['arabic-forget--slot--icon'] : style['forget--slot--icon']} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-envelope`}></i>
        <input
          className={`${language === 'ar' ? style['arabic-forget--slot--input'] : style['forget--slot--input']} ${emailError && emailIsTouched ? style['login--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
          type="Email"
          name="email"
          autoComplete="off"
          autoFocus
          placeholder={translations.emailAddress}
          value={enteredEmail}
          onChange={emailChangedHandler}
          onBlur={emailBlurHandler}
        />
        <p style={{ marginLeft: '0 5px 0 5px', visibility: emailError && emailIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
          <i className="bi bi-exclamation-triangle-fill red"></i> {emailError}
        </p>
      </div>
      <button type="submit" className={`${style['forget--btn']} full-width mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`}>{translations.requestPasswordReset}</button>
      <div className="full-width flex-row-left-start">
        <NavLink to={'/auth/login'} style={{ textDecoration: 'none' }} className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-14px margin-12px-H pointer`}>{translations.login}</NavLink>
      </div>
    </form>
  );
};

export default ForgetPassword;
