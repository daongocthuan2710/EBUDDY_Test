// Libraries
import bcrypt from "bcrypt";
import { isNumber, omit } from "lodash";

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
  private collectionRef = db.collection("USERS");

  public async findByEmail(email: string): Promise<TUser | null> {
    try {
      const snapshot = await this.collectionRef
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
      const docRef = await this.collectionRef.add(newUser);
      return docRef.id;
    } catch (error) {
      throw new Error("Failed to create user in repository");
    }
  }

  public async setPotentialScoreDefaults() {
    const snapshot = await this.collectionRef.get();
    for (const doc of snapshot.docs) {
      const data = doc.data();
      if (typeof data.potentialScore !== "number") {
        await doc.ref.update({ potentialScore: 0 });
      }
    }
  }

  public async getAllUsers(
    params: TGetAllUsersParams
  ): Promise<TGetAllUsersResult> {
    const { page, limit, sort, az } = params;

    try {
      const offset = (page - 1) * limit;
      const snapshot = await this.collectionRef
        .orderBy("potentialScore", "desc")
        // .orderBy(sort, az)
        .offset(offset)
        .limit(limit)
        .get();

      const totalSnapshot = await this.collectionRef.get();
      const totalRows = totalSnapshot.size;

      const data: TUser[] = [];
      snapshot.forEach((doc) => {
        const user = {
          ...(doc.data() as Omit<TUser, "id">),
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
      const docRef = this.collectionRef.doc(id);
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
      const docRef = this.collectionRef.doc(id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        return false;
      }

      const oldData = docSnap.data() as TUser;

      const now = new Date().toISOString();

      /** 
       * Supports pagination to efficiently retrieve the highest potential users
       * To determine the most potential user, we prioritize:
          Total Average Weighted Ratings (highest priority)
          Number of Rents
          Recent Activity
       **/
      const totalAverageWeightedRatings =
        data.totalAverageWeightRatings ??
        oldData.totalAverageWeightRatings ??
        0;
      const numberOfRents = data.numberOfRents ?? oldData.numberOfRents ?? 0;
      const recentlyActive = data.recentlyActive ?? oldData.recentlyActive ?? 0;
      const recentlyActiveMs =
        !!recentlyActive && !isNumber(recentlyActive)
          ? new Date(recentlyActive).getTime()
          : 0;

      const potentialScore =
        1000 * totalAverageWeightedRatings +
        10 * numberOfRents +
        0.0000000000001 * recentlyActiveMs;

      await docRef.update({
        ...data,
        potentialScore,
        updatedAt: now,
      } as Omit<TUser, "id">);

      return true;
    } catch (error) {
      throw new Error("Failed to update user information");
    }
  }

  public async updateRecentlyActive(id: string): Promise<boolean> {
    try {
      const docRef = this.collectionRef.doc(id);
      const docSnap = await docRef.get();

      if (!docSnap.exists) {
        return false;
      }
      const oldData = docSnap.data() as TUser;
      const now = new Date().toISOString();

      /** 
       * Supports pagination to efficiently retrieve the highest potential users
       * To determine the most potential user, we prioritize:
          Total Average Weighted Ratings (highest priority)
          Number of Rents
          Recent Activity
       **/
      const totalAverageWeightedRatings =
        oldData.totalAverageWeightRatings ?? 0;
      const numberOfRents = oldData.numberOfRents ?? 0;
      const recentlyActiveMs = new Date(now).getTime();
      const potentialScore =
        1000 * totalAverageWeightedRatings +
        10 * numberOfRents +
        0.0000000000001 * recentlyActiveMs;

      await docRef.update({
        recentlyActive: now,
        potentialScore,
      });

      return true;
    } catch (error) {
      throw new Error("Failed to update recentlyActive");
    }
  }
}
