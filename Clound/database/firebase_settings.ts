import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2rfOEqep55xlGCvHoF7wAzk0eNvXB5Fg",
  authDomain: "du-zilla.firebaseapp.com",
  projectId: "du-zilla",
  storageBucket: "du-zilla.firebasestorage.app",
  messagingSenderId: "495815854962",
  appId: "1:495815854962:web:bbd4c14b2c57fc76206beb",
  measurementId: "G-6HHSTF38JW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = getAuth();


// export const admin = require("firebase-admin");

// const serviceAccount = require("./du-zilla-firebase-adminsdk-fbsvc-e96d9af1a4.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

