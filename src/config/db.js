import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyAanoRbZKRC7PJZbGgqoLPNnM5ty5HB4yY',
  authDomain: 'tbccrecords.firebaseapp.com',
  databaseURL: 'https://rn-tbc.firebaseio.com',
  projectId: 'rn-tbc',
  storageBucket: 'rn-tbc.appspot.com',
  messagingSenderId: '779958846678',
  appId: '1:235399015867:ios:680c24c6db961d6c0a689e',
  measurementId: 'G-ZEJ2V66817',
};
let app = Firebase.initializeApp(config);
export const db = app.database();
