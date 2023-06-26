import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { getMessaging, getToken } from "firebase/messaging";

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

function PushNotification() {

    // firebase.messaging.getToken().then((token) => {
    //     console.log('FCM token:', token);
    //     // You can store the token on your server for sending notifications later
    // });
    const messaging = getMessaging();
    // Add the public key generated from the console here.
    getToken(messaging, { vapidKey: "BH9-0-fHGeM6bA_9I_IAhHlRLpiOSQ_9gaApnTg7JIxDvBTGCrOL_JsJRSNCuPp4yXk8fDZ0i_IV7t8WCJape44" })
        .then((token) => {
            console.log('FCM token:', token);
            // You can store the token on your server for sending notifications later
        })
    return <div></div>;
}


export default PushNotification;
