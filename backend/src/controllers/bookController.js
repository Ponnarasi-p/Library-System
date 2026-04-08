const bookService = require("../services/bookService");
const { successResponse } = require("../utils/responseHandler");
const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

const { validateCreateBook } = require("../validators/bookCreateValidator");
const { validateUpdateBook } = require("../validators/bookUpdateValidator");

const {
  createBookRequestDto,
  updateBookRequestDto,
} = require("../DTO/bookRequestDto");

exports.upsertBook = async (req, res, next) => {
  try {
    const id = req.params.id ? parseInt(req.params.id) : null;

    let requestData;

    if (id) {
      validateUpdateBook(req.body);
      requestData = updateBookRequestDto(req.body);
    } else {
      validateCreateBook(req.body);
      requestData = createBookRequestDto(req.body);
    }

    let fileData = null;

    if (req.file) {
      fileData = {
        file_name: req.file.originalname,
        stored_file_name: req.file.filename,
        file_path: req.file.path,
        file_size_kb: req.file.size / 1024,
        file_type: req.file.mimetype,
      };
    }

    const result = await bookService.upsertBook(id, requestData, fileData);

    return successResponse(
      res,
      id ? HTTP.OK : HTTP.CREATED,
      id ? MESSAGE.BOOK_UPDATE_SUCCESS : MESSAGE.BOOK_CREATE_SUCCESS,
      id ? "Book updated successfully" : "Book created successfully",
      result
    );
  } catch (error) {
    next(error);
  }
};

// GET ALL
exports.getBooks = async (req, res, next) => {
  try {
    const books = await bookService.getBooks(req.query);

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_FETCH_SUCCESS,
      "Books fetched successfully",
      books
    );
  } catch (error) {
    next(error);
  }
};

// GET BY ID
exports.getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_FETCH_BY_ID_SUCCESS,
      "Book fetched successfully",
      book
    );
  } catch (error) {
    next(error);
  }
};

// DELETE
exports.deleteBook = async (req, res, next) => {
  try {
    await bookService.deleteBook(req.params.id);

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_DELETE_SUCCESS,
      "Book deleted successfully"
    );
  } catch (error) {
    next(error);
  }
};