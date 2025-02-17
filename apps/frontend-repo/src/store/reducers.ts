import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  loading: boolean;
  error: string | null;
  success: string | null;
  message: string | null;
}

const initialState: UIState = {
  loading: false,
  error: null,
  success: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      if (action.payload) {
        state.success = null;
      }
    },
    setSuccess(state, action: PayloadAction<string | null>) {
      state.success = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    resetUIState(state) {
      state.loading = false;
      state.error = null;
      state.success = null;
      state.message = null;
    },
  },
});

export const { setLoading, setError, setSuccess, resetUIState, setMessage } =
  userSlice.actions;
export default userSlice.reducer;
