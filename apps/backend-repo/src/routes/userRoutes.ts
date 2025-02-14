import express from "express";
import { getUserData, listAllUsers, updateUserData } from "../controller/api";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/users", listAllUsers);
router.get("/user/:id", authMiddleware, getUserData);
router.post("/user/:id", authMiddleware, updateUserData);

export default router;
