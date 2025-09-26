"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const du_zilla_firebase_adminsdk_fbsvc_e96d9af1a4_json_1 = __importDefault(require("./du-zilla-firebase-adminsdk-fbsvc-e96d9af1a4.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(du_zilla_firebase_adminsdk_fbsvc_e96d9af1a4_json_1.default)
});
exports.default = firebase_admin_1.default;
const db = firebase_admin_1.default.firestore();
exports.db = db;
