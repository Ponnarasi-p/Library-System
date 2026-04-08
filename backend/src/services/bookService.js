const bookRepository = require("../repositories/bookRepository");
const { bookResponseDto, bookListDto } = require("../DTO/bookDto");
const {
  createBookRequestDto,
  updateBookRequestDto,
} = require("../DTO/bookRequestDto");
const { paginationDto } = require("../DTO/paginationDto");

const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

// FILE BUILDER
const buildFileData = (file) => {
  if (!file) return null;

  return {
    file_name: file.originalname,
    stored_file_name: file.filename,
    file_path: file.path,
    file_size_kb: file.size / 1024,
    file_type: file.mimetype,
  };
};


// CREATE BOOK

exports.createBook = async (data, file) => {
  try {
    const requestData = createBookRequestDto(data);

    const duplicate = await bookRepository.findDuplicate(requestData);

    if (duplicate) {
      throw {
        status: HTTP.BAD_REQUEST,
message: MESSAGE.BOOK_ALREADY_EXISTS, // ❌ we will fix below
        description: "Book already exists",
      };
    }

    requestData.available_copies = requestData.total_copies;

    const fileData = buildFileData(file);

    const book = await bookRepository.upsertBook(
      null,
      requestData,
      fileData
    );

    return bookResponseDto(book);

  } catch (error) {
    throw error;
  }
};


// UPDATE BOOK

exports.updateBook = async (id, data, file) => {
  try {
    const existing = await bookRepository.getBookById(id);

    if (!existing) {
      throw {
        status: HTTP.NOT_FOUND,
message: MESSAGE.BOOK_NOT_FOUND, // ❌ fix below
        description: "Book not found",
      };
    }

    const requestData = updateBookRequestDto(data);

    if (requestData.book_title) {
      const duplicate = await bookRepository.findDuplicate(requestData);

      if (duplicate && duplicate.book_id !== parseInt(id)) {
        throw {
          status: HTTP.BAD_REQUEST,
          message: MESSAGE.BOOK_ALREADY_EXISTS, // ❌ fix below
          description: "Book already exists",
        };
      }
    }

    const fileData = buildFileData(file);

    const updatedBook = await bookRepository.upsertBook(
      id,
      requestData,
      fileData
    );

    return bookResponseDto(updatedBook);

  } catch (error) {
    throw error;
  }
};


// GET ALL BOOKS

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


// GET BOOK BY ID

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


// DELETE BOOK

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