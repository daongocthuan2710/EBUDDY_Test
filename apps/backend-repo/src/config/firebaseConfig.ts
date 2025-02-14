import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

const serviceAccount: ServiceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://backend-repo-9fff9.firebaseio.com",
});

const db = admin.firestore();
export { db };
