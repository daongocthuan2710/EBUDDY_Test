import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../config/firebaseConfig";
import { TUser } from "@my-monorepo/lib";

export const getAllUsers = async (): Promise<TUser[]> => {
  const snapshot = await db.collection("users").get();
  const users: TUser[] = [];

  snapshot.forEach((doc: QueryDocumentSnapshot) => {
    const data = doc.data();

    const user: TUser = {
      id: doc.id,
      email: data.email ?? "",
      password: data.password ?? "",
      displayName: data.displayName ?? "",
      createdAt: data.createdAt, // Timestamp
      updatedAt: data.updatedAt, // Timestamp
    };

    users.push(user);
  });

  return users;
};
