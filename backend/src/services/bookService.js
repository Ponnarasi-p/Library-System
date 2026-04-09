const bookRepository = require("../repositories/bookRepository");
const { bookResponseDto, bookListDto } = require("../DTO/bookDto");
const { paginationDto } = require("../DTO/paginationDto");
const { buildFileData } = require("../utils/fileBuilder");

const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

// ================= UPSERT =================
exports.upsertBook = async (id, data, file) => {
  try {
    const fileData = buildFileData(file);

    // CREATE
    if (!id) {
      const duplicate = await bookRepository.findDuplicate(data);

      if (duplicate) {
        throw {
          status: HTTP.BAD_REQUEST,
          message: MESSAGE.BOOK_ALREADY_EXISTS,
          description: "Book already exists",
        };
      }

      data.available_copies = data.total_copies;
    }

    // UPDATE
    if (id) {
      const existing = await bookRepository.getBookById(id);

      if (!existing) {
        throw {
          status: HTTP.NOT_FOUND,
          message: MESSAGE.BOOK_NOT_FOUND,
          description: "Book not found",
        };
      }

      if (data.book_title) {
        const duplicate = await bookRepository.findDuplicate(data);

        if (duplicate && duplicate.book_id !== parseInt(id)) {
          throw {
            status: HTTP.BAD_REQUEST,
            message: MESSAGE.BOOK_ALREADY_EXISTS,
            description: "Book already exists",
          };
        }
      }
    }

    const book = await bookRepository.upsertBook(id, data, fileData);

    return bookResponseDto(book);

  } catch (error) {
    throw error;
  }
};


// ================= GET ALL =================
exports.getBooks = async (query) => {
  try {
    const pagination = paginationDto(query);

    const result = await bookRepository.getBooks({
      skip: pagination.skip,
      take: pagination.take,
      search: query.search,
      status: query.status,
    });

    return {
      data: bookListDto(result.data),
      meta: {
        total: result.total,
        page: pagination.page,
        limit: pagination.limit,
      },
    };

  } catch (error) {
    throw error;
  }
};


// ================= GET BY ID =================
exports.getBookById = async (id) => {
  try {
    const book = await bookRepository.getBookById(id);

    if (!book) {
      throw {
        status: HTTP.NOT_FOUND,
        message: MESSAGE.BOOK_NOT_FOUND,
        description: "Book not found",
      };
    }

    return bookResponseDto(book);

  } catch (error) {
    throw error;
  }
};


// ================= DELETE =================
exports.deleteBook = async (id) => {
  try {
    const existing = await bookRepository.getBookById(id);

    if (!existing) {
      throw {
        status: HTTP.NOT_FOUND,
        message: MESSAGE.BOOK_NOT_FOUND,
        description: "Book not found",
      };
    }

    await bookRepository.deleteBook(id);

    return true;

  } catch (error) {
    throw error;
  }
};