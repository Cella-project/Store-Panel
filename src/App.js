import React, { useEffect } from 'react';

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

  const lastRefreshTime = localStorage.getItem('Refresh Token Time');
  const currentTime = new Date().getTime();
  const timeDifference = currentTime - lastRefreshTime;

  const mode = useSelector(state => state.theme.mode);
  const accessToken = localStorage.getItem('Access Token');
  const refreshToken = localStorage.getItem('Refresh Token');
  const user = useSelector(state => state.auth.userData);

  const checkAuth = () => {
    if (accessToken && refreshToken) {
      if (timeDifference >= 14 * 60 * 1000) {
        refreshTokenHandler(refreshToken);
      }
      dispatch(authMutations.setUserData(null));
      dispatch(authActions.getProfile());
      dispatch(authMutations.setAuthData({
        userData: user,
        access: accessToken,
        refresh: refreshToken
      }));
    } else {
      localStorage.removeItem('Access Token');
      localStorage.removeItem('Refresh Token');
      router.navigate('/store-panel/auth/login');
    }
  };

  const refreshTokenHandler = (token) => {
    if (token) {
      dispatch(authActions.refreshToken(token));
    }
  };

  
  if (!isLoaded) {
    checkAuth();
    setInterval(() => {
      refreshTokenHandler(refreshToken);
    }, 14 * 60 * 1000);
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