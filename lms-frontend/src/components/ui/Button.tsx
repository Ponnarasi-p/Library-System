"use client";

import styles from "@/styles/button.module.css";

export default function Button({ children, onClick, type = "button" }: any) {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
}