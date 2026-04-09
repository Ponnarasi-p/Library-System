const bookService = require("../services/bookService");
const { successResponse } = require("../utils/responseHandler");//Standard response formatter
const { bookRequestDto } = require("../DTO/bookRequestDto");//Cleans & transforms incoming request
const { buildUpsertResponse } = require("../utils/controllerHelper"); 

const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

const LOG = require("../constants/logConstants");
const { logInfo, logError } = require("../utils/logHelper");

//  UPSERT 
exports.upsertBook = async (req, res, next) => {
  const requestId = req.requestId;

  try {
    logInfo("upsertBookController", LOG.MESSAGE.START, requestId, LOG.TYPE.UPSERT);

    const { id, bookData } = bookRequestDto(req.body);

    const result = await bookService.upsertBook(id, bookData, req.file, requestId);

    const { statusCode, message } = buildUpsertResponse(id);

    logInfo("upsertBookController", LOG.MESSAGE.END, requestId, LOG.TYPE.UPSERT);

    return successResponse(res, statusCode, message, result);

  } catch (error) {
    logError("upsertBookController", error, requestId, LOG.TYPE.UPSERT);
    next(error);
  }
};

//  GET ALL 
exports.getBooks = async (req, res, next) => {
  const requestId = req.requestId;

  try {
    logInfo("getBooksController", LOG.MESSAGE.START, requestId, LOG.TYPE.FETCH);

    const result = await bookService.getBooks(req.query, requestId);

    logInfo("getBooksController", LOG.MESSAGE.END, requestId, LOG.TYPE.FETCH);

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_FETCH_SUCCESS,
      result.data,
      result.meta
    );

  } catch (error) {
    logError("getBooksController", error, requestId, LOG.TYPE.FETCH);
    next(error);
  }
};

// GET BY ID 
exports.getBookById = async (req, res, next) => {
  const requestId = req.requestId;

  try {
    logInfo("getBookByIdController", LOG.MESSAGE.START, requestId, LOG.TYPE.FETCH);

    const result = await bookService.getBookById(req.params.id, requestId);

    logInfo("getBookByIdController", LOG.MESSAGE.END, requestId, LOG.TYPE.FETCH);

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_FETCH_BY_ID_SUCCESS,
      result
    );

  } catch (error) {
    logError("getBookByIdController", error, requestId, LOG.TYPE.FETCH);
    next(error);
  }
};

// DELETE 
exports.deleteBook = async (req, res, next) => {
  const requestId = req.requestId;

  try {
    logInfo("deleteBookController", LOG.MESSAGE.START, requestId, LOG.TYPE.DELETE);

    await bookService.deleteBook(req.params.id, requestId);

    logInfo("deleteBookController", LOG.MESSAGE.END, requestId, LOG.TYPE.DELETE);

    return successResponse(
      res,
      HTTP.OK,
      MESSAGE.BOOK_DELETE_SUCCESS
    );

  } catch (error) {
    logError("deleteBookController", error, requestId, LOG.TYPE.DELETE);
    next(error);
  }
};