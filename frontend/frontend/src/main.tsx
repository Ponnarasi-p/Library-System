import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authProvider";
import { SnackbarProvider } from "./context/snackbarProvider"; // ✅ ADD THIS
import { ThemeProvider } from "@mui/material";
import theme from "./styles/muiTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <SnackbarProvider> {/* ✅ GLOBAL SNACKBAR */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </ThemeProvider>
);