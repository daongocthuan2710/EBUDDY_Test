// Libraries
import { useCallback, useEffect, useState } from "react";
import { TUser } from "@my-monorepo/lib";
import { useSnackbar } from "notistack";

// Queries
import { useGetUserList, useUpdateUser } from "@/queries/User";

// Constants
import { QUERY_KEYS } from "@/constants/queries";

// Stores
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setMessage } from "@/store/reducers";

interface TState {
  page: number;
  pageSize: number;
  editingRowId: string | null;
  editValues: Partial<TUser>;
}

const INITIAL_STATE: TState = {
  page: 0,
  pageSize: 10,
  editingRowId: null,
  editValues: {},
};

export const useUserTable = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateUser } = useUpdateUser();

  const dispatch = useAppDispatch();
  const { message } = useAppSelector((state) => state.user);

  const [state, setState] = useState(INITIAL_STATE);

  const { data, isFetching, isLoading, refetch } = useGetUserList({
    data: { page: state.page + 1, limit: state.pageSize },
  });

  useEffect(() => {
    if (message === QUERY_KEYS.GET_USER_LIST) {
      refetch();
      dispatch(setMessage(null));
    }
  }, [message, refetch, dispatch]);

  const onEdit = useCallback(
    (user: TUser) => {
      setState((prev) => ({
        ...prev,
        editingRowId: user.id,
        editValues: {
          name: user.name,
          totalAverageWeightRatings: user.totalAverageWeightRatings,
          numberOfRents: user.numberOfRents,
          recentlyActive: user.recentlyActive,
        },
      }));
    },
    [setState]
  );

  const onSave = useCallback(
    async (userId: string) => {
      try {
        const updated = {
          ...state.editValues,
        };

        const data = { ...updated, id: userId };
        await updateUser(data);
        refetch();
        setState((prev) => ({
          ...prev,
          editingRowId: null,
          editValues: {},
          page: 0,
        }));
      } catch (error) {
        enqueueSnackbar("User is updated failed!", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          autoHideDuration: 2000,
        });
      }
    },
    [state.editValues, updateUser, enqueueSnackbar, setState]
  );

  const onCancel = useCallback(() => {
    setState((prev) => ({
      ...prev,
      editingRowId: null,
      editValues: {},
    }));
  }, [setState]);

  const onChangeField = useCallback(
    (field: keyof TUser, value: string | number) => {
      setState((prev) => ({
        ...prev,
        editValues: { ...prev.editValues, [field]: value },
      }));
    },
    [setState]
  );

  const onChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setState((prev) => ({ ...prev, page: newPage }));
    },
    [setState]
  );

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prev) => ({ ...prev, page: 0, pageSize: +event.target.value }));
    },
    [setState]
  );

  return {
    loading: isFetching || isLoading,
    rows: data?.data || [],
    totalRows: data?.total_row || 0,
    state,
    onEdit,
    onSave,
    onCancel,
    onChangeField,
    onChangePage,
    onChangeRowsPerPage,
  };
};
