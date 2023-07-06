import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { getMessaging, getToken } from "firebase/messaging";
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
        const messaging = getMessaging();

        const hasToken = localStorage.getItem('fcmToken');

        if (!hasToken) {
            getToken(messaging, { vapidKey: 'BH9-0-fHGeM6bA_9I_IAhHlRLpiOSQ_9gaApnTg7JIxDvBTGCrOL_JsJRSNCuPp4yXk8fDZ0i_IV7t8WCJape44' })
                .then((token) => {
                    // You can store the token on your server for sending notifications later
                    dispatch(notificationActions.registerToken(token));
                    // Store the token in local storage to indicate that it has been retrieved
                    localStorage.setItem('fcmToken', token);
                })
                .catch((error) => {
                    console.log('Error getting FCM token:', error);
                });
        }
    }, [dispatch]);
    return <div></div>;
}


export default PushNotification;
