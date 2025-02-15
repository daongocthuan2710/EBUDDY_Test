import { createTheme } from "@mui/material/styles";

export const THEMES = {
  LIGHT_THEME: { key: "light", name: "Light Theme" },
  DARK_THEME: { key: "dark", name: "Dark Theme" },
};

export const LIGHT_THEME = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export const DARK_THEME = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
    },
    secondary: {
      main: "#03dac6",
    },
  },
});
