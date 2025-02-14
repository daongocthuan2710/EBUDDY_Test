import { Timestamp } from "firebase-admin/firestore";

/**
 * User interface mô tả structure trong Firestore
 */
export interface User {
  id: string;
  email: string;
  password?: string;
  displayName?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
