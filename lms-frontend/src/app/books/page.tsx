"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import BooksToolbar from "@/components/book/BooksToolbar";
import BooksTable from "@/components/book/BooksTable";

import { useBooks, useDeleteBook } from "@/hooks/useBooks";

import styles from "@/styles/books.module.css";

export default function BooksPage() {
  const router = useRouter();

  //  FILTERS
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  //  PAGINATION 
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  //  FETCH DATA
  const { data, isLoading } = useBooks({
    search,
    status,
    page: page + 1, // backend is 1-based
    limit: pageSize,
  });

  const {mutate: deleteMutation} = useDeleteBook();

  const books = data?.data || [];
  const total = data?.meta?.total || 0;

  //  RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setPage(0);
  }, [search, status]);

  // RESET PAGE WHEN PAGE SIZE CHANGES
  useEffect(() => {
    setPage(0);
  }, [pageSize]);

  // DELETE HANDLER
  const handleDelete = (id: number) => {
    if (!confirm("Delete this book?")) return;
    deleteMutation(id);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Books</h1>

      {/*  TOOLBAR */}
      <BooksToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onCreate={() => router.push("/books/create")}
      />

      {/* TABLE */}
      <BooksTable
        rows={books}
        rowCount={total}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onDelete={handleDelete}
      />
    </div>
  );
}