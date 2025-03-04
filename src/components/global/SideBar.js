import React from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import languages from './languages';

import { authActions } from "../../apis/actions";

import './SideBar.scss';

const SideBar = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state.theme.mode);
  const language = useSelector(state => state.language.language);
  const translations = languages[language];

  const handleLogout = () => {
    dispatch(authActions.logout(translations.logoutSuccessfully));
  }

  return (
    <div className={`${language === 'ar' ? 'side-bar-arabic' : 'side-bar'} flex-col-center mint-green-bg`}>
      <div className={`${language === 'ar' ? 'side-bar-arabic' : 'side-bar'}--cont flex-col-top-start`}>
        <NavLink end to={'/store-panel/'}>
          <i className={`bi bi-house-door margin-12px-V size-24px ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <div className={`${language === 'ar' ? 'side-bar-arabic' : 'side-bar'}--cont--description inter size-16px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.home}</div>
        </NavLink>
        <NavLink to={'/store-panel/products'} >
          <i className={`bi bi-box-seam margin-12px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <div className={`${language === 'ar' ? 'side-bar-arabic' : 'side-bar'}--cont--description inter size-16px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.products}</div>
        </NavLink>
        <NavLink to={'/store-panel/orders'} >
          <i className={`bi bi-receipt margin-12px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <div className={`${language === 'ar' ? 'side-bar-arabic' : 'side-bar'}--cont--description inter size-16px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.orders}</div>
        </NavLink>
        <NavLink to={'/store-panel/ordersHistory'} >
          <i className={`bi bi-hourglass-split margin-12px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <div className={`${language === 'ar' ? 'side-bar-arabic' : 'side-bar'}--cont--description inter size-16px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.orderHistory}</div>
        </NavLink>
        <NavLink to={'/store-panel/logActivities'} >
          <i className={`bi bi-clock-history margin-12px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <div className={`${language === 'ar' ? 'side-bar-arabic' : 'side-bar'}--cont--description inter size-16px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.logActivity}</div>
        </NavLink>
        <NavLink onClick={handleLogout} to={'/store-panel/login'} >
          <i className={`bi bi-door-open margin-12px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <div className={`${language === 'ar' ? 'side-bar-arabic' : 'side-bar'}--cont--description inter size-16px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.logout}</div>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
