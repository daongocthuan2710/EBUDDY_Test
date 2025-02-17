// Types
import { TUser } from "@my-monorepo/lib";

// Utils
import { callApi } from "../API";

// Constants
import { APP_CONFIG } from "@/constants";

const BASE_URL = APP_CONFIG.BASE_URL;

interface TRegisterParams {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export const login = async (data: Pick<TUser, "email" | "password">) => {
  try {
    const response = await callApi<TUser>({
      method: "POST",
      baseURL: BASE_URL,
      url: "/login",
      data,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (data: TRegisterParams) => {
  try {
    const response = await callApi({
      method: "POST",
      baseURL: BASE_URL,
      url: "/register",
      data,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
