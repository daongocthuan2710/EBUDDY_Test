// Libraries
import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Types
import { TUser } from "@my-monorepo/lib";

// Constants
import { DEFAULT_SECRET, HTTP_STATUS } from "../constants";

// Repositories
import { UserRepository } from "../repository/userRepository";

const userRepository = new UserRepository();

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res
        .status(HTTP_STATUS.BAD_REQUEST.code)
        .json({ message: "Not enough information provided" });
      return;
    }

    const existingUser = await userRepository.findByEmail(email);

    if (!existingUser) {
      res
        .status(HTTP_STATUS.BAD_REQUEST.code)
        .json({ message: "Email already in use" });
      return;
    }

    await userRepository.createUser({ email, password, name });
    res
      .status(HTTP_STATUS.CREATED.code)
      .json({ message: "Registration successful" });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_GATEWAY.code).json({ message: "Server error" });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(HTTP_STATUS.BAD_REQUEST.code)
        .json({ message: "Not enough information provided" });
      return;
    }

    const userQuery = await userRepository.findByEmail(email);
    if (!userQuery) {
      res
        .status(HTTP_STATUS.BAD_REQUEST.code)
        .json({ message: "Email or password is incorrect" });
      return;
    }

    const match = await bcrypt.compare(password, userQuery?.password || "");
    if (!match) {
      res
        .status(HTTP_STATUS.BAD_REQUEST.code)
        .json({ message: "Email or password is incorrect" });
      return;
    }

    const token = jwt.sign(
      { userId: userQuery.id, email: userQuery.email },
      process.env.JWT_SECRET || DEFAULT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(HTTP_STATUS.OK.code)
      .json({ message: "Login successful", token });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_GATEWAY.code).json({ message: "Server error" });
  }
};
