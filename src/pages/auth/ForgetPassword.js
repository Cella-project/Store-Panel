import React from "react";
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import { forgetPasswordSchema } from '../../validations/auth/forgetPasswordSchema';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../apis/actions';
import style from './ForgetPassword.module.scss';
import languages from '../../components/global/languages';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.language);
  const translations = languages[language];

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: forgetPasswordSchema,
    onSubmit(values, actions) {
      dispatch(authActions.forgetPassword(values));
    }
  });

  return (
    <form onSubmit={handleSubmit} noValidate className={`${style['forget']} flex-col-center white-bg radius-5px shadow-2px`}>
      <div className={`${language === 'ar' ? style['arabic-forget--info'] : style['forget--info']} full-width flex-col-left-start off-gray-bg margin-10px-V radius-5px`}>
        <p className="space-none inter gray margin-4px-V size-12px">{translations.pleaseEnterEmail}</p>
      </div>
      <div className={`${language === 'ar' ? style['arabic-forget--slot'] : style['forget--slot']} full-width flex-col-left-start margin-4px-V`}>
        <p style={{ marginLeft: '5px' }} className="no-padding margin-6px-V size-16px inter gray">{translations.emailAddress}</p>
        <i className={`${language === 'ar' ? style['arabic-forget--slot--icon'] :style['forget--slot--icon']} orange size-20px bi bi-envelope`}></i>
        <input
          className={`${language === 'ar' ? style['arabic-forget--slot--input'] :style['forget--slot--input']} ${errors.email && touched.email ? style['login--slot--input--error'] : ''} inter gray size-14px radius-10px shadow-2px`}
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
      <button type="submit" className={`${style['forget--btn']} full-width orange-bg white inter pointer radius-10px shadow-2px`}>{translations.requestPasswordReset}</button>
      <div className="full-width flex-row-left-start">
        <NavLink to={'/auth/login'} style={{ textDecoration: 'none' }} className="space-none inter orange size-14px margin-12px-H pointer">{translations.login}</NavLink>
      </div>
    </form>
  );
};

export default ForgetPassword;
