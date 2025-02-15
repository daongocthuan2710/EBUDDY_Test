"use client";

import { Button } from "@mui/material";
import { useCustomTheme } from "../MUIThemeProvider";

export const ThemeSwitcher: React.FC = () => {
  const { themeMode, toggleTheme } = useCustomTheme();

  return (
    <Button variant="contained" color="secondary" onClick={toggleTheme}>
      Switch to {themeMode === "light" ? "Dark" : "Light"} Theme
    </Button>
  );
};
