import styles from "@/styles/badge.module.css";

export default function Badge({ status }: any) {
  return (
    <span
      className={
        status === "ACTIVE"
          ? styles.active
          : styles.inactive
      }
    >
      {status}
    </span>
  );
}