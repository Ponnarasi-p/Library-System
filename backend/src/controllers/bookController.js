const bookService = require("../services/bookService");
const { successResponse } = require("../utils/responseHandler");
const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

const { validateCreateBook } = require("../validators/bookCreateValidator");

const {
  createBookRequestDto,
  updateBookRequestDto, // ✅ ADD THIS
} = require("../DTO/bookRequestDto");

const { validateUpdateBook } = require("../validators/bookUpdateValidator");
// ✅ CREATE BOOK
exports.createBook = async (req, res, next) => {
  try {
    validateCreateBook(req.body);

    const requestData = createBookRequestDto(req.body);

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

    await bookService.createBook(requestData, fileData);

    return successResponse(
      res,
      HTTP.CREATED,
      MESSAGE.BOOK_CREATE_SUCCESS,
      "Book created successfully"
    );
  } catch (error) {
    next(error);
  }
};

// ✅ GET ALL BOOKS
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

// ✅ GET BOOK BY ID
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

// ✅ UPDATE BOOK (🔥 FIXED)
exports.updateBook = async (req, res, next) => {
  try {
    const requestData = updateBookRequestDto(req.body); // ✅ IMPORTANT FIX

    const updatedBook = await bookService.updateBook(
      req.params.id,
      requestData
    );

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_UPDATE_SUCCESS,
      "Book updated successfully",
      updatedBook // optional: return updated data
    );
  } catch (error) {
    next(error);
  }
};

// ✅ DELETE BOOK
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

exports.updateBook = async (req, res, next) => {
  try {
    validateUpdateBook(req.body); // ✅ ADD THIS

    const requestData = updateBookRequestDto(req.body);

    const updatedBook = await bookService.updateBook(
      req.params.id,
      requestData
    );

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_UPDATE_SUCCESS,
      "Book updated successfully",
      updatedBook
    );
  } catch (error) {
    next(error);
  }
};