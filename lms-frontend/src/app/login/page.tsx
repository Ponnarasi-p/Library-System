"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "@/styles/books.module.css";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    localStorage.setItem("token", data.data.token);

    router.push("/books");
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>

      <div className={styles.form}>
        <Input
          placeholder="Email"
          onChange={(e: any) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          onChange={(e: any) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <Button onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
}