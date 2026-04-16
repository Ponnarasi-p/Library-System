"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FileUpload from "@/components/ui/FileUpload";

import { upsertBook } from "@/services/bookService";
import { useSnackbar } from "@/context/SnackbarContext";

import styles from "@/styles/books.module.css";

export default function CreateBook() {
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [form, setForm] = useState<any>({
    book_title: "",
    author_name: "",
    total_copies: "",
    status: "ACTIVE",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([k, v]) =>
        formData.append(k, v)
      );

      if (file) formData.append("cover_file", file);

      await upsertBook(formData);

      showSnackbar("Created successfully", "success");

      router.push("/books");
    } catch (err: any) {
      showSnackbar(err.message, "error");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create Book</h1>

      <div className={styles.form}>
        <Input placeholder="Title" onChange={(e:any)=>setForm({...form,book_title:e.target.value})}/>
        <Input placeholder="Author" onChange={(e:any)=>setForm({...form,author_name:e.target.value})}/>
        <Input type="number" placeholder="Copies" onChange={(e:any)=>setForm({...form,total_copies:e.target.value})}/>

        <FileUpload onFileSelect={setFile} />

        <Button onClick={handleSubmit}>Save</Button>
      </div>
    </div>
  );
}