import { db } from "./config/firebaseConfig";

const testFirestore = async () => {
  try {
    console.log("Starting Firestore");
    const snapshot = await db.collection("USERS").get();
    console.log({ snapshot });
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
    console.log("Ending Firestore");
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
  }
};

testFirestore();

// npx ts-node src/testFirestore.ts
