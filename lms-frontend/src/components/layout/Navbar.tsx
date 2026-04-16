"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import styles from "@/styles/books.module.css";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className={styles.navbar}>
      <h2
        className={styles.logo}
        onClick={() => router.push("/books")}
      >
        Library
      </h2>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}