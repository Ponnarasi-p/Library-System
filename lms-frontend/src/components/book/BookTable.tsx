"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BookRow from "./BookRow";
import Button from "@/components/ui/Button";
import Snackbar from "@/components/ui/Snackbar";

import styles from "@/styles/books.module.css";
import { deleteBook } from "@/services/bookService";

export default function BookTable({
  books,
  page,
  setPage,
  total,
  limit,
  refresh,
}: any) {
  const router = useRouter();

  const [snackbar, setSnackbar] = useState<any>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const totalPages = Math.ceil(total / limit);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      setLoadingId(id);

      await deleteBook(id);

      setSnackbar({
        message: "Deleted successfully",
        type: "success",
      });

      refresh();
    } catch {
      setSnackbar({
        message: "Delete failed",
        type: "error",
      });
    } finally {
      setLoadingId(null);
    }
  };

  if (!books.length) {
    return <p className={styles.page}>No books available</p>;
  }

  return (
    <>
      {/* TABLE */}
      <div className={styles.table}>
        <div className={styles.row}>
          <b>Title</b>
          <b>Author</b>
          <b>Copies</b>
          <b>Status</b>
          <b>Actions</b>
        </div>

    {books.map((book: any, index: number) => {
  return (
    <BookRow
      key={book.id || index}
      book={book}
      onView={(id: number) => router.push(`/books/view/${id}`)}
      onEdit={(id: number) => router.push(`/books/edit/${id}`)}
      onDelete={handleDelete}
      loadingId={loadingId}
    />
  );
})}
      </div>

      {/* PAGINATION */}
      <div className={styles.pagination}>
        <Button
          disabled={page === 1}
          onClick={() => setPage((p: number) => Math.max(p - 1, 1))}
        >
          Prev
        </Button>

        <span>
          Page {page} / {totalPages || 1}
        </span>

        <Button
          disabled={page >= totalPages}
          onClick={() => setPage((p: number) => p + 1)}
        >
          Next
        </Button>
      </div>

      {/* SNACKBAR */}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </>
  );
}