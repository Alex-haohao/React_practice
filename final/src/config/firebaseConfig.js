import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
  apiKey: "AIzaSyCly9kz1MX6Ovq6Js4PMBMLCVf_vcS8UCY",
  authDomain: "cse316final.firebaseapp.com",
  databaseURL: "https://cse316final.firebaseio.com",
  projectId: "cse316final",
  storageBucket: "cse316final.appspot.com",
  messagingSenderId: "846473275549",
  appId: "1:846473275549:web:aff5eea15b1e546f010c74"
    
  };
firebase.initializeApp(firebaseConfig);

export default firebase;