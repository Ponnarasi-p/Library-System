const bookRepository = require("../repositories/bookRepository");
const {
  bookResponseDto,
  bookListDto,
} = require("../DTO/bookDto");

// ✅ CREATE BOOK
exports.createBook = async (data, fileData) => {
  data.total_copies = parseInt(data.total_copies);
  data.available_copies = data.total_copies;

  return await bookRepository.createBook(data, fileData);
};

// ✅ GET ALL BOOKS
exports.getBooks = async (query) => {
  const result = await bookRepository.getBooks(query);

  return {
    ...result,
    data: bookListDto(result.data),
  };
};

// ✅ GET BOOK BY ID (🔥 FIXED WITH NOT FOUND)
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

// ✅ UPDATE BOOK (🔥 WITH BUSINESS LOGIC)
exports.updateBook = async (id, data) => {
  // ✅ validate total copies
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

  const updatedBook = await bookRepository.updateBook(id, data);

  return bookResponseDto(updatedBook);
};

// ✅ DELETE BOOK
exports.deleteBook = async (id) => {
  return await bookRepository.deleteBook(id);
};