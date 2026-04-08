import axiosInstance from "../../config/axiosInstance";

// ✅ GET BOOKS
export const getBooks = async (params: any) => {
  const res = await axiosInstance.get("/books", { params });

  return {
    data: res.data.data,   // ✅ array of books
    meta: res.data.meta,   // ✅ pagination
  };
};

// ✅ CREATE
export const createBook = async (data: FormData) => {
  const res = await axiosInstance.post("/books", data);
  return res.data.data;
};

// ✅ UPDATE
export const updateBook = async (id: number, data: FormData) => {
  const res = await axiosInstance.put(`/books/${id}`, data);
  return res.data.data;
};

// ✅ DELETE
export const deleteBook = async (id: number) => {
  const res = await axiosInstance.delete(`/books/${id}`);
  return res.data;
};

// ✅ GET BY ID (FIXED)
export const getBookById = async (id: number) => {
  const res = await axiosInstance.get(`/books/${id}`);
  return res.data.data; // ✅ SINGLE OBJECT
};