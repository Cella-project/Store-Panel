import React,{useEffect} from 'react';

import { Outlet } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import StickyBoard from './components/sticky/StickyBoard';
import Popup from './components/popups/Popup';

import { authMutations } from './redux/mutations';
import router from './router/router';

let isLoaded = false;

const App = () => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.language.language);
  const mode = useSelector(state => state.theme.mode);

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('User'));
    const token = localStorage.getItem('Token');

    if (user && token) {
      dispatch(authMutations.setAuthData({
        userData: user,
        token: token
      }));
    } else {
      localStorage.removeItem('User');
      localStorage.removeItem('Token');
      router.navigate('/auth/login');
    }
  };

  if (!isLoaded) {
    checkAuth();
    isLoaded = true;
  }
  useEffect(() => {
    // Update the document's language attribute when the selected language changes
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
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