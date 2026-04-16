"use client";

import styles from "@/styles/input.module.css";

export default function Input({ ...props }: any) {
  return <input className={styles.input} {...props} />;
}