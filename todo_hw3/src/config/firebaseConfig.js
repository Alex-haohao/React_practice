import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE

var firebaseConfig = {
    apiKey: "AIzaSyCblLoVpnABKP359zXyFXEgpc10J5LNc9s",
    authDomain: "cse316-tixi.firebaseapp.com",
    databaseURL: "https://cse316-tixi.firebaseio.com",
    projectId: "cse316-tixi",
    storageBucket: "cse316-tixi.appspot.com",
    messagingSenderId: "788871470794",
    appId: "1:788871470794:web:13e2a84c13e672faf81e33",
    measurementId: "G-6S6ZFP2DN4"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;