import admin from 'firebase-admin';
import ServiceAccount from "./duzilla-firebase-key.json";

admin.initializeApp({
   credential: admin.credential.cert(ServiceAccount as admin.ServiceAccount)
});
export default admin;

const db = admin.firestore();
export {db};