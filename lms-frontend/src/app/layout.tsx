"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { SnackbarProvider } from "@/context/SnackbarContext";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <Navbar />
            {children}
          </SnackbarProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}