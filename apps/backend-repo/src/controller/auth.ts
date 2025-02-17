// Libraries
import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { omit } from "lodash";

// Types
import { TUser } from "@my-monorepo/lib";

// Constants
import { DEFAULT_SECRET, HTTP_STATUS, HTTP_STATUS_MESSAGE } from "../constants";

// Repositories
import { UserRepository } from "../repository/userRepository";

const userRepository = new UserRepository();

export const register: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, name, password, confirmPassword } = req.body;
    if (req.method !== "POST") {
      res.status(HTTP_STATUS.NOT_ACCEPTABLE.code).json({
        code: HTTP_STATUS.NOT_ACCEPTABLE.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: "Method not allowed",
      });
    }

    if (!email || !name || !password || !confirmPassword) {
      res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        code: HTTP_STATUS.BAD_REQUEST.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: "Missing required fields",
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        code: HTTP_STATUS.BAD_REQUEST.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: "Confirm password is incorrect",
      });
      return;
    }

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        code: HTTP_STATUS.BAD_REQUEST.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: "Email already in use",
      });
      return;
    }

    await userRepository.createUser({ email, password, name });
    res.status(HTTP_STATUS.CREATED.code).json({
      code: HTTP_STATUS.CREATED.text,
      status: HTTP_STATUS_MESSAGE.SUCCESS,
      message: "Registration successful",
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_GATEWAY.code).json({
      code: HTTP_STATUS.BAD_GATEWAY.text,
      status: HTTP_STATUS_MESSAGE.ERROR,
      message: HTTP_STATUS.BAD_GATEWAY.message,
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        code: HTTP_STATUS.BAD_REQUEST.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: "Missing required fields",
      });
      return;
    }

    const userQuery = await userRepository.findByEmail(email);
    if (!userQuery) {
      res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        code: HTTP_STATUS.BAD_REQUEST.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: "Email or password is incorrect",
      });
      return;
    }

    const match = await bcrypt.compare(password, userQuery?.password || "");
    if (!match) {
      res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        code: HTTP_STATUS.BAD_REQUEST.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: "Email or password is incorrect",
      });
      return;
    }

    const token = jwt.sign(
      { userId: userQuery.id, email: userQuery.email },
      process.env.JWT_SECRET || DEFAULT_SECRET,
      { expiresIn: "1d" }
    );

    await userRepository.updateRecentlyActive(userQuery.id);
    res.status(HTTP_STATUS.OK.code).json({
      code: HTTP_STATUS.OK.text,
      status: HTTP_STATUS_MESSAGE.SUCCESS,
      message: "Login successful",
      token,
      data: omit(userQuery, ["password"]),
    });
  } catch (error) {
    res.status(HTTP_STATUS.BAD_GATEWAY.code).json({
      code: HTTP_STATUS.BAD_GATEWAY.text,
      status: HTTP_STATUS_MESSAGE.ERROR,
      message: HTTP_STATUS.BAD_GATEWAY.message,
    });
  }
};
