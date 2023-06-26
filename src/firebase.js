import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

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

export default firebase;