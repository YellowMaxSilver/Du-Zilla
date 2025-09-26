"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = exports.analytics = exports.app = void 0;
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const du_zilla_firebase_adminsdk_fbsvc_e96d9af1a4_json_1 = __importDefault(require("./du-zilla-firebase-adminsdk-fbsvc-e96d9af1a4.json"));
const auth_1 = require("firebase/auth");
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
exports.app = (0, app_1.initializeApp)(firebaseConfig);
exports.analytics = (0, analytics_1.getAnalytics)(exports.app);
exports.auth = (0, auth_1.getAuth)();
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(du_zilla_firebase_adminsdk_fbsvc_e96d9af1a4_json_1.default)
});
exports.default = firebase_admin_1.default;
const db = firebase_admin_1.default.firestore();
exports.db = db;
// export const admin = require("firebase-admin");
// const serviceAccount = require("./du-zilla-firebase-adminsdk-fbsvc-e96d9af1a4.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
