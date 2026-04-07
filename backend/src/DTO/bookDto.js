const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

exports.bookResponseDto = (book) => {
  return {
    id: book.book_id,
    title: book.book_title,
    author: book.author_name,
    totalCopies: book.total_copies,
    availableCopies: book.available_copies,
    status: book.status,

    coverUrl: book.cover_file
      ? `${BASE_URL}/${book.cover_file
          .replace("src\\", "")
          .replace(/\\/g, "/")}`
      : null,
  };
};

exports.bookListDto = (books) => {
  return books.map((book) => exports.bookResponseDto(book)); // ✅ reuse
};