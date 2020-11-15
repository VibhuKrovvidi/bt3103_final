//import * as firebase from 'firebase/app'
//import 'firebase/auth'
//import 'firebase/firestore'
import firebase from 'firebase';

// firebase init - add your own config here
var firebaseConfig = {
    //ORIGINAL
    apiKey: "AIzaSyBIUxocMC_yFdcOHI3ulWGHBRKmqFrokf0",
    authDomain: "bt3103-mysid.firebaseapp.com",
    databaseURL: "https://bt3103-mysid.firebaseio.com",
    projectId: "bt3103-mysid",
    storageBucket: "bt3103-mysid.appspot.com",
    messagingSenderId: "949067625359",
    appId: "1:949067625359:web:30fa5d1217840c374e91fa",
    measurementId: "G-5XYZ7ESLPE"

    //SECOND (USE FOR EXCEEDED QUOTA)
    /*
    apiKey: "AIzaSyAUyPIulbeT9QHHe3kqdLzWUj5mtt5gAt8",
    authDomain: "bt3103-second.firebaseapp.com",
    databaseURL: "https://bt3103-second.firebaseio.com",
    projectId: "bt3103-second",
    storageBucket: "bt3103-second.appspot.com",
    messagingSenderId: "156382812332",
    appId: "1:156382812332:web:27665ebdf7e594e420e709",
    measurementId: "G-RPZE6YEE2J"
    */
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.firestore();
export default database;
