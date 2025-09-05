import admin from 'firebase-admin';
import ServiceAccount from "./du-zilla-firebase-adminsdk-fbsvc-e96d9af1a4.json";

admin.initializeApp({
   credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount)
});
export default admin;

const db = admin.firestore();
export {db};