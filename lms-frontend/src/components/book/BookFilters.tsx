"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "@/styles/books.module.css";

export default function BookFilters({
  search,
  setSearch,
  status,
  setStatus,
  onCreate,
}: any) {
  return (
    <div className={styles.filters}>
      <Input
        placeholder="Search"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
      />

      <select
        className={styles.select}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="ACTIVE">ACTIVE</option>
        <option value="INACTIVE">INACTIVE</option>
      </select>

      <div className={styles.spacer} />

      <Button onClick={onCreate}>+ Create Book</Button>
    </div>
  );
}