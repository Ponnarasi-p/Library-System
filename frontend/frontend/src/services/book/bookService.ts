import axiosInstance from "../../config/axiosInstance";

export const getBooks = (params: any) => {
  return axiosInstance.get("/books", { params });
};

export const createBook = (data: FormData) => {
  return axiosInstance.post("/books", data);
};

export const updateBook = (id: number, data: FormData) => {
  return axiosInstance.put(`/books/${id}`, data);
};

export const deleteBook = (id: number) => {
  return axiosInstance.delete(`/books/${id}`);
};

export const getBookById = (id: number) => {
  return axiosInstance.get(`/books/${id}`);
};
