import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { SnackbarProvider } from "@/context/SnackbarContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SnackbarProvider>
          <Navbar />
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}