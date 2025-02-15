"use client";

// Libraries
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

// Components
import { MUIThemeProvider } from "@/components";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </Provider>
  );
};
