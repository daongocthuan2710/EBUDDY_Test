// Libraries
import { Method } from "axios";

// Types
import { TResponse } from "@/types";

// Utils
import { getAccessToken } from "@/utils";

type TCallAPIParams = {
  baseURL?: string;
  method: Method;
  url: string;
  params?: Record<string, any>;
  data?: any;
};

export async function callApi<T>({
  baseURL = process.env.NEXT_PUBLIC_API_URL,
  method,
  url,
  params,
  data,
}: TCallAPIParams): Promise<TResponse<T>> {
  let newUrl = `${baseURL}` + url;
  if (params) {
    Object.keys(params).forEach((key) => {
      if (newUrl.includes("?")) {
        newUrl += `&${key}=${params[key]}`;
      } else {
        newUrl += `?${key}=${params[key]}`;
      }
    });
  }

  const token = await getAccessToken();

  try {
    const requestConfig = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    if (token) {
      requestConfig.headers["Authorization"] = `Bearer ${token}`;
    }

    const results = await fetch(newUrl, requestConfig);

    return results.json();
  } catch (err: any) {
    throw new Error(err.response?.data.message);
  }
}
