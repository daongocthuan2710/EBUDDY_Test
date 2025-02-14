import { Request, RequestHandler, Response } from "express";
import { getAllUsers } from "../repository/userCollection";

export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData = { id: req.params.id, name: "John Doe" };
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const listAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    // Thay vì `return res.status(200).json(users)`...
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    res.status(200).json({ message: "User updated", id, updatedData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
