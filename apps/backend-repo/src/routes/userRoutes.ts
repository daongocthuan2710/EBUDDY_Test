// Libraries
import express from "express";

// Controllers
import {
  getUserDetail,
  listAllUsers,
  updateUserData,
} from "../controller/userController";
import { register, login } from "../controller/auth";

// Middlewares
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Prefix: /api

// Auth
router.post("/register", register);
router.post("/login", login);

// Users
router.get("/fetch-user-data", authMiddleware, listAllUsers);
router.get("/fetch-user-detail/:id", authMiddleware, getUserDetail);
router.post("/update-user-data", authMiddleware, updateUserData);

export default router;
