const bookService = require("../services/bookService");
const { successResponse } = require("../utils/responseHandler");
const { bookRequestDto } = require("../DTO/bookRequestDto");
const { buildUpsertResponse } = require("../utils/controllerHelper");
const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

// UPSERT
exports.upsertBook = async (req, res, next) => {
  try {
    const dto = bookRequestDto(req.body);

    const result = await bookService.upsertBook(
      dto.id,
      dto,
      req.file
    );

    const { statusCode, message } = buildUpsertResponse(dto.id);

    return successResponse(res, statusCode, message, result);

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