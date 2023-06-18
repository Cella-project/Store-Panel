import React, { useState,useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../apis/actions';
import { useFormik } from 'formik';
import { loginSchema } from '../../validations/auth/loginSchema';
import style from './Login.module.scss';
import languages from '../../components/global/languages';

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mode = useSelector(state => state.theme.mode);
  const language = useSelector(state => state.language.language);
  const translations = languages[language];

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit(values, actions) {
      dispatch(authActions.login(values));
    }
  });

  useEffect(() => {
    document.title = 'Login • Store Panel';

    if (localStorage.getItem('Token')) {
        // Redirect to the dashboard
        navigate('/');
    }
}, [navigate]);


  return (
    <form onSubmit={handleSubmit} noValidate className={`${style['login']} flex-col-center white-bg radius-5px shadow-5px`}>
      <div className={`${language === 'ar' ? style['arabic-login--slot'] : style['login--slot']} full-width flex-col-left-start margin-4px-V`}>
        <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.emailAddress}</p>
        <i className={`${language === 'ar' ? style['arabic-login--slot--icon'] : style['login--slot--icon']} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-envelope`}></i>
        <input
          className={`${language === 'ar' ? style['arabic-login--slot--input'] : style['login--slot--input']} ${errors.email && touched.email ? style['login--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
          type="Email"
          name="email"
          autoComplete="off"
          autoFocus
          placeholder={translations.emailAddress}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p style={{ marginLeft: '5px', visibility: errors.email && touched.email ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
          <i className="bi bi-exclamation-triangle-fill red"></i> {errors.email}
        </p>
      </div>
      <div className={`${language === 'ar' ? style['arabic-login--slot'] : style['login--slot']} full-width flex-col-left-start margin-4px-V`}>
        <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.password}</p>
        <i className={`${language === 'ar' ? style['arabic-login--slot--icon'] : style['login--slot--icon']} ${mode === 'dark-mode' ? 'gray' : 'mint-green'} size-20px bi bi-key`}></i>
        <i className={`${language === 'ar' ? style['arabic-login--slot--icon--left'] : style['login--slot--icon--right']} bi bi-eye${!passwordShown ? "-slash" : ""} size-20px pointer ${mode === 'dark-mode' ? 'gray' : 'mint-green'}`} onClick={() => setPasswordShown(!passwordShown)} />
        <input
          className={`${language === 'ar' ? style['arabic-login--slot--input'] : style['login--slot--input']} ${errors.password && touched.password ? style['login--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
          type={passwordShown ? "text" : "password"}
          name="password"
          autoComplete="off"
          placeholder={translations.password}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <p style={{ marginLeft: '5px', visibility: errors.password && touched.password ? 'visible' : 'hidden' }} className="no-padding margin-6px-V size-12px inter gray">
          <i className="bi bi-exclamation-triangle-fill red"></i> {errors.password}
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
