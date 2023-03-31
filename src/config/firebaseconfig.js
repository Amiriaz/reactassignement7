// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYLU2hhiN-MzDNNVfMKxhLVPFQikreYHg",
  authDomain: "customer-6deaf.firebaseapp.com",
  databaseURL: "https://customer-6deaf-default-rtdb.firebaseio.com",
  projectId: "customer-6deaf",
  storageBucket: "customer-6deaf.appspot.com",
  messagingSenderId: "624253871475",
  appId: "1:624253871475:web:eb513f2c8648e4a6035106",
  measurementId: "G-9X3D5TY23H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;