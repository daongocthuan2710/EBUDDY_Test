"use client";

// Libraries
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Stores
import { store } from "../store/store";

// Components
import { MUIThemeProvider } from "@/components";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <SnackbarProvider>
            <MUIThemeProvider>{children}</MUIThemeProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
};
