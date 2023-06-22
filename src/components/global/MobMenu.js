import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import logo from '../../assets/images/white-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../apis/actions';
import languages from './languages';

import './MobMenu.scss';

const MobMenu = ({ menuToggle }) => {
    const dispatch = useDispatch();
    const mode = useSelector(state => state.theme.mode);
    const language = useSelector(state => state.language.language);
    const translations = languages[language];
    const handleLogout = () => {
        dispatch(authActions.logout(translations.logoutSuccessfully));
    }


    let menuRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                menuToggle(false);
                window.onscroll = function () { };
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    return (
        <div className={`mob-menu ${language === 'ar' ? 'mob-menu-arabic' : ''} flex-col-top-start mint-green-bg shadow-5px`} ref={menuRef}>
            <div className='full-width flex-row-right-start'>
                <i className={`bi bi-x size-40px ${mode === 'dark-mode' ? 'gray' : 'white'} pointer`} onClick={() => {
                    menuToggle(false)
                    window.onscroll = function () { };
                }}
                />
            </div>
            <div className='full-width flex-row-center margin-10px-V'>
                <img src={logo} alt='ACTORE' className={`mob-menu${language === 'ar' ? '-arabic' : ''}--logo`} />
            </div>
            <PerfectScrollbar className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body margin-10px-V`}>
                <div className='full-width flex-col-left-start'>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        end to={'/'} className="margin-8px-V"
                    >
                        <i className={`bi bi-house-door ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.home}</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/products'} className="margin-8px-V"
                    >
                        <i className={`bi bi-box-seam ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.products}</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/orders'} className="margin-8px-V"
                    >
                        <i className={`bi bi-receipt ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.orders}</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/ordersHistory'} className="margin-8px-V"
                    >
                        <i className={`bi bi-hourglass-split ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.orderHistory}</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/reviews'} className="margin-8px-V"
                    >
                        <i className={`bi bi-stars ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.reviews}</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/vouchers'} className="margin-8px-V"
                    >
                        <i className={`bi bi-tags ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.vouchers}</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/logActivities'} className="margin-8px-V"
                    >
                        <i className={`bi bi-clock-history ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.logActivity}</span>
                    </NavLink>
                    <NavLink
                        onClick={() => {
                            menuToggle(false)
                            window.onscroll = function () { };
                        }}
                        to={'/comp&suggestions'} className="margin-8px-V"
                    >
                        <i className={`bi bi-exclamation-triangle ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.compSuggestions}</span>
                    </NavLink>
                    <NavLink
                        onClick={handleLogout} to={'/login'} className="margin-8px-V"
                    >
                        <i className={`bi bi-door-open ${mode === 'dark-mode' ? 'gray' : 'white'} size-24px`} /><span className={`mob-menu${language === 'ar' ? '-arabic' : ''}--body--description inter size-20px ${mode === 'dark-mode' ? 'gray' : 'white'}`}>{translations.logout}</span>
                    </NavLink>
                </div>
            </PerfectScrollbar>
        </div>
    )
}

export default MobMenu