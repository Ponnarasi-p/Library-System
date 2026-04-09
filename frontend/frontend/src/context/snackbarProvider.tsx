import { createContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const SnackbarContext = createContext<any>(null);

export const SnackbarProvider = ({ children }: any) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message: string, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({ ...snackbar, open: false })
        }
      >
        <Alert severity={snackbar.severity as any} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};