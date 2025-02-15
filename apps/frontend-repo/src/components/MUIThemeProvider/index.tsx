"use client";

// Libraries
import { ReactNode, useMemo, useState, createContext, useContext } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

// Constants
import { THEMES, LIGHT_THEME, DARK_THEME } from "../../constants/theme";

interface ThemeContextProps {
  themeMode: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const MUIThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState(THEMES.LIGHT_THEME.key);

  const toggleTheme = () => {
    setThemeMode((prevMode) =>
      prevMode === THEMES.LIGHT_THEME.key
        ? THEMES.DARK_THEME.key
        : THEMES.LIGHT_THEME.key
    );
  };

  const theme = useMemo(
    () => (themeMode === THEMES.DARK_THEME.key ? DARK_THEME : LIGHT_THEME),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useCustomTheme must be used within a MUIThemeProvider");
  }
  return context;
};
