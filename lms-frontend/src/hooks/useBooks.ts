"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getBooks, deleteBook } from "@/services/bookService";

//  GET BOOKS
export const useBooks = (params: any) => {
  return useQuery({
    queryKey: ["books", params], //catche key

    queryFn: () => getBooks(params), //calls service layer


    placeholderData: (prev) => prev,
  });
};

// DELETE BOOK
export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
  });
};