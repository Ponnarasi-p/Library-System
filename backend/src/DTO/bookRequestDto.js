exports.bookRequestDto = (data) => {
  return {
    id: data.id ? parseInt(data.id) : null, 

    bookData: {
      ...(data.book_title && {
        book_title: data.book_title.trim(),
      }),

      ...(data.author_name && {
        author_name: data.author_name.trim(),
      }),

      ...(data.total_copies && {
        total_copies: parseInt(data.total_copies),
      }),

      ...(data.available_copies && {
        available_copies: parseInt(data.available_copies),
      }),

      ...(data.status && {
        status: data.status.toUpperCase(),
      }),
    },
  };
};