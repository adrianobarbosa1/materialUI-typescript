import { createTheme } from "@mui/material";
import { blue, cyan } from "@mui/material/colors";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: blue[900],
      dark: blue[900],
      light: blue[600],
      contrastText: "#FFF",
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: "#FFF",
    },
    background: {
      default: "#EEEEF2",
      paper: "#FFF",
    },
  },
});
