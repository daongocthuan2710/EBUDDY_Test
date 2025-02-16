// Libraries
import bcrypt from "bcrypt";
import { omit } from "lodash";

// Config
import { db } from "../config/firebaseConfig";

// Types
import { TUser } from "@my-monorepo/lib";

interface TGetAllUsersParams {
  page: number;
  limit: number;
  sort: string;
  az: "asc" | "desc";
}

interface TGetAllUsersResult {
  data: TUser[];
  totalRows: number;
}

export class UserRepository {
  private collectionName = "USERS";

  public async findByEmail(email: string): Promise<TUser | null> {
    try {
      const snapshot = await db
        .collection(this.collectionName)
        .where("email", "==", email)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      if (!doc) {
        return null;
      }

      const user = doc.data() as TUser;
      if (!user) {
        return null;
      }

      user.id = doc.id;
      return user;
    } catch (error) {
      throw new Error("An error occurred while searching for user by email");
    }
  }

  public async createUser(userData: Omit<TUser, "id">): Promise<string | null> {
    try {
      if (!userData?.name || !userData?.email || !userData?.password) {
        throw new Error("User data is invalid");
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const now = new Date().toISOString();
      const newUser: Omit<TUser, "id"> = {
        ...userData,
        password: hashedPassword,
        createdAt: now,
        updatedAt: now,
      };
      const docRef = await db.collection(this.collectionName).add(newUser);
      return docRef.id;
    } catch (error) {
      throw new Error("Failed to create user in repository");
    }
  }

  public async getAllUsers(
    params: TGetAllUsersParams
  ): Promise<TGetAllUsersResult> {
    const { page, limit, sort, az } = params;

    try {
      let query = db.collection(this.collectionName).orderBy(sort, az);
      const totalSnapshot = await db.collection(this.collectionName).get();
      const totalRows = totalSnapshot.size;

      const offset = (page - 1) * limit;
      const snapshot = await query.offset(offset).limit(limit).get();
      const data: TUser[] = [];
      snapshot.forEach((doc) => {
        const user = {
          ...(doc.data() as TUser),
          id: doc.id,
        };
        data.push(omit(user, ["password"]));
      });

      return { data, totalRows };
    } catch (error) {
      throw new Error("Failed to get user list");
    }
  }

  public async getUserById(id: string): Promise<TUser | null> {
    try {
      const docRef = db.collection(this.collectionName).doc(id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        return null;
      }

      const user: TUser = {
        ...(docSnap.data() as TUser),
        id: docSnap.id,
      };
      return omit(user, ["password"]);
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  }

  public async updateUser(id: string, data: Partial<TUser>): Promise<boolean> {
    try {
      const docRef = db.collection(this.collectionName).doc(id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        return false;
      }

      const now = new Date().toISOString();
      await docRef.update({
        ...data,
        updatedAt: now,
      });

      return true;
    } catch (error) {
      throw new Error("Failed to update user information");
    }
  }
}
