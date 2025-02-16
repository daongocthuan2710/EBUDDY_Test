// Libraries
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

// Constants
import { DEFAULT_SECRET, HTTP_STATUS } from "../constants";

export const authMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res
        .status(HTTP_STATUS.UN_AUTHORIZED.code)
        .json({ message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || DEFAULT_SECRET);

    (req as any).user = decoded;
    next();
  } catch (error) {
    res
      .status(HTTP_STATUS.UN_AUTHORIZED.code)
      .json({ message: "Invalid token" });
  }
};
