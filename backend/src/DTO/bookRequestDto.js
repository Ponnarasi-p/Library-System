exports.createBookRequestDto = (data) => {
  return {
    book_title: data.book_title?.trim(),
    author_name: data.author_name?.trim(),
    total_copies: parseInt(data.total_copies),
    status: data.status?.toUpperCase(),
  };
};

exports.updateBookRequestDto = (data) => {
  return {
    ...(data.title && { book_title: data.title.trim() }),
    ...(data.author && { author_name: data.author.trim() }),
    ...(data.totalCopies && {
      total_copies: parseInt(data.totalCopies),
    }),
    ...(data.availableCopies && {
      available_copies: parseInt(data.availableCopies),
    }),
    ...(data.status && { status: data.status.toUpperCase() }),
  };
};