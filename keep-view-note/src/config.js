import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDF7i_GDk0iCB3pE4l4cGGSrIkzFb4u14I",
    authDomain: "keep-view-note.firebaseapp.com",
    projectId: "keep-view-note",
    storageBucket: "keep-view-note.appspot.com",
    messagingSenderId: "789526994850",
    appId: "1:789526994850:web:8afea2f32bcfa91a989cfb",
    measurementId: "G-FT2VSQRPGQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);