"use client";

import { API } from "@/constants/api";

const getToken = () => localStorage.getItem("token");

const handleResponse = async (res: Response) => {
  const data = await res.json();

  if (!res.ok || data.status === "error") {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

// GET BOOKS
export const getBooks = async (params: any) => {
  const query = new URLSearchParams({
    page: String(params.page || 1),
    limit: String(params.limit || 5),
    search: params.search || "",
    status: params.status || "",
  }).toString();

  const res = await fetch(`${API.BASE_URL}${API.BOOKS}?${query}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  const data = await handleResponse(res);

  return {
    data: data.data || [],
    meta: data.meta || {},
  };
};

// UPSERT
export const upsertBook = async (data: FormData) => {
  const res = await fetch(`${API.BASE_URL}${API.BOOKS}/upsert`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: data,
  });

  return handleResponse(res);
};

// DELETE
export const deleteBook = async (id: number) => {
  const res = await fetch(`${API.BASE_URL}${API.BOOKS}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  return handleResponse(res);
};

// GET BY ID
export const getBookById = async (id: number) => {
  const res = await fetch(`${API.BASE_URL}${API.BOOKS}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  const data = await handleResponse(res);

  return data.data;
};