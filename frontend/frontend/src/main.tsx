import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authProvider";
import { ThemeProvider } from "@mui/material";
import theme from "./styles/muiTheme";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
  <AuthProvider>
    <App />
  </AuthProvider>
</ThemeProvider>
);