//import * as firebase from 'firebase/app'
//import 'firebase/auth'
//import 'firebase/firestore'
import firebase from 'firebase';

// firebase init - add your own config here
var firebaseConfig = {
    apiKey: "AIzaSyBIUxocMC_yFdcOHI3ulWGHBRKmqFrokf0",
    authDomain: "bt3103-mysid.firebaseapp.com",
    databaseURL: "https://bt3103-mysid.firebaseio.com",
    projectId: "bt3103-mysid",
    storageBucket: "bt3103-mysid.appspot.com",
    messagingSenderId: "949067625359",
    appId: "1:949067625359:web:30fa5d1217840c374e91fa",
    measurementId: "G-5XYZ7ESLPE"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();
export default database;
