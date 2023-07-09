importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');

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
const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
    // Handle push notification event
    const data = event.data.json();
    const title = data.notification.title;
    const options = {
        body: data.notification.body,
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

// Other event listeners and messaging handlers as needed

// Register the service worker
self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});
