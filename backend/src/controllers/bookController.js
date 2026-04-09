const bookService = require("../services/bookService");
const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");
const { successResponse } = require("../utils/responseHandler");

const {
  createBookRequestDto,
  updateBookRequestDto,
} = require("../DTO/bookRequestDto");


// UPSERT CONTROLLER
exports.upsertBook = async (req, res, next) => {
  try {
    const id = req.body.id;

    const dto = id
      ? updateBookRequestDto(req.body)
      : createBookRequestDto(req.body);

    const result = await bookService.upsertBook(id, dto, req.file);

    return successResponse(
      res,
      id ? HTTP.OK : HTTP.CREATED,
      id ? MESSAGE.BOOK_UPDATE_SUCCESS : MESSAGE.BOOK_CREATE_SUCCESS,
      result
    );
  } catch (error) {
    next(error);
  }
};



// GET ALL
exports.getBooks = async (req, res, next) => {
  try {
    const result = await bookService.getBooks(req.query);

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_FETCH_SUCCESS,
      result.data,
      result.meta
    );
  } catch (error) {
    next(error);
  }
};

// GET BY ID
exports.getBookById = async (req, res, next) => {
  try {
    const result = await bookService.getBookById(req.params.id);

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_FETCH_BY_ID_SUCCESS,
      result
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
      MESSAGE.BOOK_DELETE_SUCCESS
    );
  } catch (error) {
    next(error);
  }
};