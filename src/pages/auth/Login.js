import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../apis/actions';
import style from './Login.module.scss';
import languages from '../../components/global/languages';
import useInput from '../../hooks/useInput';

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector(state => state.theme.mode);
  const language = useSelector(state => state.language.language);
  const translations = languages[language];

  useEffect(() => {
    document.title = 'Login • Store Panel';

    if (localStorage.getItem('Token')) {
      // Redirect to the dashboard
      navigate('/');
    }
  }, [navigate]);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
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

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    error: passwordError,
    isTouched: passwordIsTouched,
    valueChangeHandler: passwordChangedHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => {
    let error = '';
    let isValid = true;
    if (!value) {
      error = translations.passwordRequired;
      isValid = false;
    } else if (value.length < 8) {
      error = translations.passwordLength
      isValid = false;
    }
    return { error, isValid };
  });

  let formIsValid = false;

  if (enteredPasswordIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }
    const formData = {
      email: enteredEmail.trim().toLowerCase(),
      password: enteredPassword
    };

    dispatch(authActions.login(formData, translations.logInSuccessfullyWelcomeBack));
  };


  return (
    <form onSubmit={handleLogin} noValidate className={`${style['login']} flex-col-center white-bg radius-5px shadow-5px`}>
      <div className={`${language === 'ar' ? style['arabic-login--slot'] : style['login--slot']} full-width flex-col-left-start margin-4px-V`}>
        <p style={{ marginLeft: '0 5px 0 5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.emailAddress}</p>
        <i className={`${language === 'ar' ? style['arabic-login--slot--icon'] : style['login--slot--icon']} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-envelope`}></i>
        <input
          className={`${language === 'ar' ? style['arabic-login--slot--input'] : style['login--slot--input']} ${emailError && emailIsTouched ? style['login--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
          type="email"
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
      <div className={`${language === 'ar' ? style['arabic-login--slot'] : style['login--slot']} full-width flex-col-left-start margin-4px-V`}>
        <p style={{ marginLeft: '0 5px 0 5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.password}</p>
        <i className={`${language === 'ar' ? style['arabic-login--slot--icon'] : style['login--slot--icon']} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-key`}></i>
        <i className={`${language === 'ar' ? style['arabic-login--slot--icon--left'] : style['login--slot--icon--right']} bi bi-eye${!passwordShown ? "-slash" : ""} size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'mint-green'}`} onClick={() => setPasswordShown(!passwordShown)} />
        <input
          className={`${language === 'ar' ? style['arabic-login--slot--input'] : style['login--slot--input']} ${passwordError && passwordIsTouched ? style['login--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
          type={passwordShown ? "text" : "password"}
          name="password"
          autoComplete="off"
          placeholder={translations.password}
          value={enteredPassword}
          onChange={passwordChangedHandler}
          onBlur={passwordBlurHandler}
        />
        <p style={{ marginLeft: '0 5px 0 5px', visibility: passwordError && passwordIsTouched ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
          <i className="bi bi-exclamation-triangle-fill red"></i> {passwordError}
        </p>
      </div>
      <button className={`${style['login--btn']} full-width mint-green-bg ${mode === 'dark-mode' ? 'gray' : 'white'} inter pointer radius-10px shadow-2px`} type="submit">{translations.logIn}</button>
      <div className="full-width flex-row-left-start">
        <NavLink to={'/auth/forget-password'} style={{ textDecoration: 'none' }} className={`space-none inter ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-14px margin-12px-H pointer`}>{translations.forgetPassword}</NavLink>
      </div>
    </form>
  );
};

export default Login;
