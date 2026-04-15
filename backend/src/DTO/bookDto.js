const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

export const bookResponseDto = book => {
  return {
    id: book.book_id,
    title: book.book_title,
    author: book.author_name,
    totalCopies: book.total_copies,
    availableCopies: book.available_copies,
    status: book.status,

    coverUrl:
      book.documents && book.documents.length > 0
        ? `${BASE_URL}/${book.documents[0].file_path
          .replace('src\\', '')
          .replace(/\\/g, '/')}`
        : null,
  };
};

export const bookListDto = books => {
  return books.map(book => bookResponseDto(book));
};