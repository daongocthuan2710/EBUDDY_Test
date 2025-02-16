// Libraries
import { Request, RequestHandler, Response } from "express";
import { isNumber } from "lodash";

// Repositories
import { UserRepository } from "../repository";

// Constants
import { HTTP_STATUS, HTTP_STATUS_MESSAGE } from "../constants";

// Types
import { TUser } from "@my-monorepo/lib";

const userRepository = new UserRepository();

export const getUserDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userData = await userRepository.getUserById(id);
    if (!userData) {
      res.status(HTTP_STATUS.NOT_FOUND.code).json({
        code: HTTP_STATUS.NOT_FOUND.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: `User with id '${id}' not found`,
      });
    }

    res.status(HTTP_STATUS.OK.code).json({
      code: HTTP_STATUS.OK.text,
      status: HTTP_STATUS_MESSAGE.SUCCESS,
      data: userData,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      code: HTTP_STATUS.INTERNAL_SERVER_ERROR.text,
      status: HTTP_STATUS_MESSAGE.ERROR,
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
    });
  }
};

export const listAllUsers: RequestHandler = async (req, res) => {
  try {
    const page = isNumber(parseInt(req.query.page as string))
      ? parseInt(req.query.page as string)
      : 1;
    const limit = isNumber(parseInt(req.query.limit as string))
      ? parseInt(req.query.limit as string)
      : 10;

    const sort = (req.query.sort as string) || "updatedAt";
    const az = (req.query.az as "asc" | "desc") || "asc";
    const { data, totalRows } = await userRepository.getAllUsers({
      page,
      limit,
      sort,
      az,
    });

    res.status(HTTP_STATUS.OK.code).json({
      code: HTTP_STATUS.OK.text,
      status: HTTP_STATUS_MESSAGE.SUCCESS,
      total_row: totalRows,
      data,
    });
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
      .json({ error: HTTP_STATUS.INTERNAL_SERVER_ERROR.message });
  }
};

export const updateUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updateData: Partial<TUser> = req.body;
    const id = updateData.id || "";
    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST.code).json({
        code: HTTP_STATUS.BAD_REQUEST.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: `User id is required`,
      });
    }

    const updated = await userRepository.updateUser(id, updateData);

    if (!updated) {
      res.status(HTTP_STATUS.NOT_FOUND.code).json({
        code: HTTP_STATUS.NOT_FOUND.text,
        status: HTTP_STATUS_MESSAGE.ERROR,
        message: `User with id '${id}' not found`,
      });
    }

    res.status(HTTP_STATUS.OK.code).json({
      code: HTTP_STATUS.OK.text,
      status: HTTP_STATUS_MESSAGE.SUCCESS,
      message: "Successfully updated",
      id,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      code: HTTP_STATUS.INTERNAL_SERVER_ERROR.text,
      status: HTTP_STATUS_MESSAGE.ERROR,
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message,
    });
  }
};
