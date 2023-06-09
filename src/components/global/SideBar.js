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
    <div className={`side-bar ${language === 'ar' ? 'side-bar-arabic' : ''} flex-col-center orange-bg`}>
      <PerfectScrollbar className="side-bar--cont flex-col-top-start">
        <NavLink end to={'/'}>
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.home}</span>
          <i className={`bi bi-house-door margin-8px-V size-24px ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
        </NavLink>
        <NavLink to={'/products'} >
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.products}</span>
          <i className={`bi bi-box-seam margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
        </NavLink>
        {/* <NavLink to={'/orders'} >
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>Orders</span>
          <i className={`bi bi-receipt margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
        </NavLink> */}
        <NavLink to={'/ordersHistory'} >
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.orderHistory}</span>
          <i className={`bi bi-hourglass-split margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
        </NavLink>
        <NavLink to={'/reviews'} >
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.reviews}</span>
          <i className={`bi bi-stars margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
        </NavLink>
        <NavLink to={'/vouchers'} >
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.vouchers}</span>
          <i className={`bi bi-tags margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
        </NavLink>
        <NavLink to={'/logActivities'} >
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.logActivity}</span>
          <i className={`bi bi-clock-history margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
        </NavLink>
        <NavLink to={'/comp&suggestions'} >
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.compSuggestions}</span>
          <i className={`bi bi-exclamation-triangle margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
        </NavLink>
        <NavLink onClick={handleLogout} to={'/auth/login'} >
          <span className={`side-bar--cont--description inter size-20px font-light ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.logout}</span>
          <i className={`bi bi-door-open margin-8px-V ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} />
        </NavLink>
      </PerfectScrollbar>
    </div>
  );
}

export default SideBar;
