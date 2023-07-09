import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { useDispatch } from 'react-redux';
import { notificationActions } from './apis/actions';

const firebaseConfig = {
    apiKey: "AIzaSyCXJoNppTPmy4izlIrdQwy5IXCWCbQ3q_U",
    authDomain: "actore-a0b30.firebaseapp.com",
    databaseURL: "https://actore-a0b30-default-rtdb.firebaseio.com",
    projectId: "actore-a0b30",
    storageBucket: "actore-a0b30.appspot.com",
    messagingSenderId: "566032676099",
    appId: "1:566032676099:web:c44133afd6a75dae10e536",
    measurementId: "G-ZYHF15R30C"
};
firebase.initializeApp(firebaseConfig);

const PushNotification = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Check if the browser supports Firebase Messaging
        if ('Notification' in window && 'serviceWorker' in navigator && 'localStorage' in window) {
            const messaging = firebase.messaging();

            const hasToken = localStorage.getItem('fcmToken');

            if (!hasToken) {
                messaging.getToken({ vapidKey: 'BH9-0-fHGeM6bA_9I_IAhHlRLpiOSQ_9gaApnTg7JIxDvBTGCrOL_JsJRSNCuPp4yXk8fDZ0i_IV7t8WCJape44' })
                    .then((token) => {
                        dispatch(notificationActions.registerToken(token));
                        localStorage.setItem('fcmToken', token);
                    })
                    .catch((error) => {
                        console.log('Error getting FCM token:', error);
                    });
            }
        } else {
            console.log('Firebase Messaging is not supported in this browser.');
        }
    }, [dispatch]);

    return <div></div>;
};

export default PushNotification;
