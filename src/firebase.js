// import firebase module 
import firebase from 'firebase/app';
// import the database infor from the firebase module
import 'firebase/database';
// initialized firebase

const firebaseConfig = {
  apiKey: "AIzaSyCT8y7NRTDBThkvIIkCTuxfd6A0rS7h2L4",
  authDomain: "write-on-app.firebaseapp.com",
  databaseURL: "https://write-on-app-default-rtdb.firebaseio.com",
  projectId: "write-on-app",
  storageBucket: "write-on-app.appspot.com",
  messagingSenderId: "77911411845",
  appId: "1:77911411845:web:631e7621f4f746732aadec"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;