"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBookById } from "@/services/bookService";

import styles from "@/styles/books.module.css";

export default function ViewBook() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getBookById(Number(id));
      setBook(data);
    };

    fetch();
  }, []);

  if (!book) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>{book.title}</h1>

      {book.coverUrl && (
        <img src={book.coverUrl} className={styles.preview} />
      )}

      <p>{book.author}</p>
      <p>{book.totalCopies}</p>
      <p>{book.status}</p>
    </div>
  );
}