import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { RouterProvider } from "react-router-dom";

import router from './router/router';

import 'normalize.css';
import './assets/styles/style.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Provider } from 'react-redux';

import store from './redux/index';
import OfflinePage from './components/global/OfflinePage';

const root = createRoot(document.getElementById('root'));

const Index = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Provider store={store}>
      {isOnline ? (
        <RouterProvider router={router} />
      ) : (
        <OfflinePage />
      )}
    </Provider>
  );
}

root.render(<Index />);
