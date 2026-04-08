import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6C3EB8", // 🔥 purple like your UI
    },
    secondary: {
      main: "#9C27B0",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif", // 🔥 clean font
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;