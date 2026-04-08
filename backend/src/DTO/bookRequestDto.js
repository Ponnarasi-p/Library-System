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
    ...(data.book_title && { book_title: data.book_title.trim() }),
    ...(data.author_name && { author_name: data.author_name.trim() }),
    ...(data.total_copies && {
      total_copies: parseInt(data.total_copies),
    }),
    ...(data.available_copies && {
      available_copies: parseInt(data.available_copies),
    }),
    ...(data.status && { status: data.status.toUpperCase() }),
  };
};