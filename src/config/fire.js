import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBy6EEcZu1V3-8Ehic44tgcVQBTeXI2VGU",
    authDomain: "editor-69f02.firebaseapp.com",
    databaseURL: "https://editor-69f02.firebaseio.com",
    projectId: "editor-69f02",
    storageBucket: "editor-69f02.appspot.com",
    messagingSenderId: "1067420621803",
    appId: "1:1067420621803:web:670b54e1cd5bdaac6e97ae"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);

  export default fire;