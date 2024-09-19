// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOw0bOAjigez1tmLkaLkTQRp-TacyPbq4",
  authDomain: "bookly-react-native-app.firebaseapp.com",
  projectId: "bookly-react-native-app",
  storageBucket: "bookly-react-native-app.appspot.com",
  messagingSenderId: "674377587907",
  appId: "1:674377587907:web:8a8fcdc92ab6de92375676",
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
