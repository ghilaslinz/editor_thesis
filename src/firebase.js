//import firebase from "firebase/app"
/*
import "firebase/auth"
import firebase from "firebase"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBTWw8QtI9L6Ro2ip266Kn2Zy_jQET-7_o",
    authDomain: "auth-thesis-developement.firebaseapp.com",
    databaseURL: "https://auth-thesis-developement.firebaseio.com",
    projectId: "auth-thesis-developement",
    storageBucket: "auth-thesis-developement.appspot.com",
    messagingSenderId: "627965142884",
    appId: "1:627965142884:web:6373062bb602817f883c71"
})

const auth = app.auth();
var db = app.firestore();


export {auth};
*/

import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBTWw8QtI9L6Ro2ip266Kn2Zy_jQET-7_o",
    authDomain: "auth-thesis-developement.firebaseapp.com",
    databaseURL: "https://auth-thesis-developement.firebaseio.com",
    projectId: "auth-thesis-developement",
    storageBucket: "auth-thesis-developement.appspot.com",
    messagingSenderId: "627965142884",
    appId: "1:627965142884:web:6373062bb602817f883c71"
  };

  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth =firebase.auth();
 // const provider = new firebase.auth.GoogleAuthProvider();

  export {auth};
  export  {db};
