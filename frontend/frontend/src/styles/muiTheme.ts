import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#6C3EB8" },
    secondary: { main: "#9C27B0" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h4: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;