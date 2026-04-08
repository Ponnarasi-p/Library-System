const bookRepository = require("../repositories/bookRepository");
const {
  bookResponseDto,
  bookListDto,
} = require("../DTO/bookDto");

exports.upsertBook = async (id, data, fileData) => {
  // CREATE
  if (!id) {
    data.total_copies = parseInt(data.total_copies);
    data.available_copies = data.total_copies;

    const book = await bookRepository.upsertBook(null, data, fileData);
    return bookResponseDto(book);
  }

  // UPDATE
  if (data.total_copies !== undefined) {
    if (data.total_copies < 0) {
      throw {
        status: 400,
        message: "validation_failed",
        description: "Total copies must be greater than 0",
      };
    }

    data.available_copies = data.total_copies;
  }

  const updatedBook = await bookRepository.upsertBook(id, data, fileData);
  return bookResponseDto(updatedBook);
};

// GET ALL
exports.getBooks = async (query) => {
  const result = await bookRepository.getBooks(query);

  return {
    ...result,
    data: bookListDto(result.data),
  };
};

// GET BY ID
exports.getBookById = async (id) => {
  const book = await bookRepository.getBookById(id);

  if (!book) {
    throw {
      status: 404,
      message: "book_not_found",
      description: "Book not found",
    };
  }

  return [bookResponseDto(book)];
};

// DELETE
exports.deleteBook = async (id) => {
  return await bookRepository.deleteBook(id);
};