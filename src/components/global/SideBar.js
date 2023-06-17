import React from "react";
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
    dispatch(authActions.logout());
  }

  return (
    <div className={`side-bar ${language === 'ar' ? 'side-bar-arabic' : ''} flex-col-center mint-green-bg`}>
      <PerfectScrollbar className="side-bar--cont flex-col-top-start">
        <NavLink end to={'/'}>
          <i className={`bi bi-house-door margin-8px-V size-24px ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.home}</span>
        </NavLink>
        <NavLink to={'/products'} >
          <i className={`bi bi-box-seam margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.products}</span>
        </NavLink>
        {/* <NavLink to={'/orders'} >
          <i className={`bi bi-receipt margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Orders</span>
        </NavLink> */}
        <NavLink to={'/ordersHistory'} >
          <i className={`bi bi-hourglass-split margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.orderHistory}</span>
        </NavLink>
        <NavLink to={'/reviews'} >
          <i className={`bi bi-stars margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.reviews}</span>
        </NavLink>
        <NavLink to={'/vouchers'} >
          <i className={`bi bi-tags margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.vouchers}</span>
        </NavLink>
        <NavLink to={'/logActivities'} >
          <i className={`bi bi-clock-history margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.logActivity}</span>
        </NavLink>
        <NavLink to={'/comp&suggestions'} >
          <i className={`bi bi-exclamation-triangle margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.compSuggestions}</span>
        </NavLink>
        <NavLink onClick={handleLogout} to={'/auth/login'} >
          <i className={`bi bi-door-open margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.logout}</span>
        </NavLink>
      </PerfectScrollbar>
    </div>
  );
}

export default SideBar;
