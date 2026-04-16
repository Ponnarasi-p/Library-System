"use client";

import { createContext, useContext, useState } from "react";
import Snackbar from "@/components/ui/Snackbar";

const SnackbarContext = createContext<any>(null);

export const SnackbarProvider = ({ children }: any) => {
  const [snackbar, setSnackbar] = useState<any>(null);

  const showSnackbar = (message: string, type = "success") => {
    setSnackbar({ message, type });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);