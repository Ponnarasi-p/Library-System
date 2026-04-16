"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FileUpload from "@/components/ui/FileUpload";

import { getBookById, upsertBook } from "@/services/bookService";
import { useSnackbar } from "@/context/SnackbarContext";

import styles from "@/styles/books.module.css";

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [form, setForm] = useState<any>({});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookById(Number(id));

        setForm({
          book_title: data.title,
          author_name: data.author,
          total_copies: data.totalCopies,
        });

        // ✅ FIXED
        setPreview(data.coverUrl);
      } catch {
        showSnackbar("Failed to load book", "error");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) =>
        formData.append(k, v as string)
      );

      formData.append("id", id as string);

      if (file) formData.append("cover_file", file); 

      await upsertBook(formData);

      showSnackbar("Updated successfully", "success");

      router.push("/books");
    } catch (err: any) {
      showSnackbar(err.message, "error");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Book</h1>

      <div className={styles.form}>
        <Input
          value={form.book_title || ""}
          onChange={(e: any) =>
            setForm({ ...form, book_title: e.target.value })
          }
        />

        <Input
          value={form.author_name || ""}
          onChange={(e: any) =>
            setForm({ ...form, author_name: e.target.value })
          }
        />

        <Input
          type="number"
          value={form.total_copies || ""}
          onChange={(e: any) =>
            setForm({ ...form, total_copies: e.target.value })
          }
        />

        {/* ✅ IMAGE */}
        <FileUpload preview={preview} onFileSelect={setFile} />

        <Button onClick={handleSubmit}>Update</Button>
      </div>
    </div>
  );
}