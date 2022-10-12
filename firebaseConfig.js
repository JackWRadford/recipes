// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB97VSZrl3W0Sbk0H0TseNn4fB3-d1qEk",
  authDomain: "recipes-next-app.firebaseapp.com",
  projectId: "recipes-next-app",
  storageBucket: "recipes-next-app.appspot.com",
  messagingSenderId: "97970492059",
  appId: "1:97970492059:web:34476a32209a0ee7e16c3e",
  measurementId: "G-6FBY5845L3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
