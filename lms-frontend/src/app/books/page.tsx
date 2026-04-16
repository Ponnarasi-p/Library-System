"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BookTable from "@/components/book/BookTable";
import BookFilters from "@/components/book/BookFilters";
import { getBooks } from "@/services/bookService";
import { useSnackbar } from "@/context/SnackbarContext";

import styles from "@/styles/books.module.css";

export default function BooksPage() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [books, setBooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [total, setTotal] = useState(0);

const fetchBooks = async () => {
  try {
    const res = await getBooks({ page, search, status });

    setBooks(res.data);
    setTotal(res.meta.total); // ✅ IMPORTANT
  } catch {
    showSnackbar("Failed to fetch books", "error");
  }
};
  useEffect(() => {
  setPage(1);
}, [search, status]);

  useEffect(() => {
    fetchBooks();
  }, [page, search, status]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Books</h1>

      <BookFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onCreate={() => router.push("/books/create")}
      />

     <BookTable
  books={books}
  page={page}
  setPage={setPage}
  total={total}
  limit={5}
  refresh={fetchBooks}
/>
    </div>
  );
}