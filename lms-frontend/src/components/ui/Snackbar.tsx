"use client";

import { useEffect } from "react";
import styles from "@/styles/snackbar.module.css";

export default function Snackbar({ message, type, onClose }: any) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.snackbar} ${styles[type]}`}>
      {message}
    </div>
  );
}