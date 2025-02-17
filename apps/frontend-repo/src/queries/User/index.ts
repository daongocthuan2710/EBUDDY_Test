// Libraries
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";

// Constants
import { QUERY_KEYS } from "@/constants/queries";

// Types
import { TUser } from "@my-monorepo/lib";
import { TResponse } from "@/types";

// Services
import { userService } from "@/services/User";
import { useSnackbar } from "notistack";
import { HTTP_STATUS, queryClient } from "@/constants";

type TGetTaskNicheListParams<T> = {
  data?: {
    page?: number;
    limit?: number;
    sort?: string;
    az?: "asc" | "desc";
  };
  options?: UseQueryOptions<any, any, TResponse<T[]>, (string | number)[]>;
};

export const useGetUserList = <T = TUser>(
  params?: TGetTaskNicheListParams<T>
) => {
  const { options, data } = params || {};
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_LIST, JSON.stringify(data || {})],
    queryFn: () => userService.getList(data),
    placeholderData: [],
    ...options,
  });
};

export const useUpdateUser = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: userService.update,
    onError: () => {
      enqueueSnackbar("User is updated failed!", {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        autoHideDuration: 2000,
      });
    },
    onSuccess(data) {
      const { code, message } = data || {};
      const isSuccess = code === HTTP_STATUS.OK.text;

      if (isSuccess) {
        enqueueSnackbar("User is updated successfully!", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
        queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.GET_USER_LIST],
          exact: false,
        });
      } else {
        enqueueSnackbar(message || "User is updated failed!", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
      }
    },
  });
};
