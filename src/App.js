import React, {useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import StickyBoard from './components/sticky/StickyBoard';
import Popup from './components/popups/Popup';

import { authMutations } from './redux/mutations';
import router from './router/router';
import { authActions } from './apis/actions';

let isLoaded = false;

const App = () => {
  const dispatch = useDispatch();

  const language = useSelector(state => state.language.language);

  const mode = useSelector(state => state.theme.mode);
  const accessToken = localStorage.getItem('Store Access Token');
  const refreshToken = localStorage.getItem('Store Refresh Token');

  useEffect(() => {
    const refreshToken = localStorage.getItem('Store Refresh Token');
    
    const checkTimeDifference = () => {
      const currentTime = new Date().getTime();
      const lastRefreshTime = localStorage.getItem('Store Refresh Token Time');
      const timeDifference = currentTime - lastRefreshTime;

      if (timeDifference >= 14 * 60 * 1000) {
        refreshTokenHandler(refreshToken);
      }
    };

    const interval = setInterval(checkTimeDifference, 1 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  })

  const checkAuth = () => {
    if (accessToken && refreshToken) {
      dispatch(authActions.refreshToken(refreshToken)).then(() => {
        dispatch(authMutations.setUserData(null));
        dispatch(authActions.getProfile());
      });
    } else {
      localStorage.removeItem('Store Access Token');
      localStorage.removeItem('Store Refresh Token');
      localStorage.removeItem('Store fcmToken');
      router.navigate('/store-panel/login');
    }
  };

  const refreshTokenHandler = (token) => {
    if (token) {
      dispatch(authActions.refreshToken(token), () => { });
    }
  };


  if (!isLoaded) {
    checkAuth()
    isLoaded = true;
  }

  useEffect(() => {
    document.documentElement.lang = language;
    const htmlElement = document.documentElement;
    if (language === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
    }
  }, [language]);


  const notes = useSelector(state => state.sticky.notes);
  const isPopupShown = useSelector(state => state.popup.popPanelShown);

  return (
    <div className={`u-disable-touch ${mode}`}>
      {notes.length > 0 && <StickyBoard />}
      {isPopupShown && <Popup />}
      
      <Outlet />
    </div>
  );
};

export default App;