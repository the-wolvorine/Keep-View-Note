import firebase from 'firebase';
import { initializeApp } from 'firebase/app';

const firebaseConfig={
    apiKey: "AIzaSyAGcujzRJjlZZ7OyKRBZxmsOnz231WhXSI",
    authDomain: "note-d6caf.firebaseapp.com",
    databaseURL: "https://note-d6caf-default-rtdb.firebaseio.com",
    projectId: "note-d6caf",
    storageBucket: "note-d6caf.appspot.com",
    messagingSenderId: "1091351237546",
    appId: "1:1091351237546:web:480cf8ef80c26d6b1611d3",
    measurementId: "G-J9PGSK3HZX"
  };

  //firebase.initializeApp(firebaseConfig);

  //export const db = firebase.firestore();

  //export default firebase;

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
export default db;