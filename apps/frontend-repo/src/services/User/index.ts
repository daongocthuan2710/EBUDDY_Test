// Constants
import { APP_CONFIG } from "@/constants";

// Utils
import { callApi } from "../API";

// Types
import { TUser } from "@my-monorepo/lib";

const BASE_URL = APP_CONFIG.BASE_URL;

export type TGetUserListService = {
  page?: number;
  limit?: number;
  sort?: string;
  az?: "asc" | "desc";
};

export type TUpdateUserService = Partial<TUser> & {
  id: string;
};

export const userService = {
  getList: async (params: TGetUserListService) => {
    try {
      const response = await callApi<TUser[]>({
        method: "GET",
        baseURL: BASE_URL,
        url: `/fetch-user-data`,
        params: {
          ...params,
          page: params?.page || 1,
          limit: params?.limit || 10,
          sort: params?.sort || "updatedAt",
          az: params?.az || "",
        },
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  update: async (data: TUpdateUserService) => {
    try {
      const response = await callApi({
        method: "POST",
        baseURL: BASE_URL,
        url: `/update-user-data`,
        data,
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
