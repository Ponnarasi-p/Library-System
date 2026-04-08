const bookService = require("../services/bookService");
const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");
const { successResponse } = require("../utils/responseHandler");

// CREATE
exports.createBook = async (req, res, next) => {
  try {
    const result = await bookService.createBook(req.body, req.file);

    return successResponse(
      res,
      HTTP.CREATED,
      MESSAGE.BOOK_CREATE_SUCCESS,
      result
    );
  } catch (error) {
    next(error);
  }
};

// UPDATE
exports.updateBook = async (req, res, next) => {
  try {
    const result = await bookService.updateBook(
      req.params.id,
      req.body,
      req.file
    );

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_UPDATE_SUCCESS,
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