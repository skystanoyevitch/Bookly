// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// require("dotenv").config();
// console.log(process.env);
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "bookly-react-native-app.firebaseapp.com",
  projectId: "bookly-react-native-app",
  storageBucket: "bookly-react-native-app.appspot.com",
  messagingSenderId: "674377587907",
  appId: "1:674377587907:web:8a8fcdc92ab6de92375676",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
