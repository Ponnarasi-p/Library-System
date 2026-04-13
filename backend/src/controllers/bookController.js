/**
 * @module bookController
 * @desc Handles all book-related HTTP requests such as create, update,
 *       fetch, and delete operations.
 *
 * @requires ../services/bookService
 * @requires ../utils/responseHandler
 * @requires ../DTO/bookRequestDto
 * @requires ../constants/httpStatusConstants
 * @requires ../constants/messages
 * @requires ../constants/logConstants
 * @requires ../utils/logHelper
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @function upsertBook
 * @desc Creates a new book or updates an existing book
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing book details
 * @param {Object} req.file - Uploaded file (book cover/document)
 * @param {string} req.requestId - Unique request identifier for logging
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} If book creation or update fails
 */

/**
 * @function getBooks
 * @desc Fetches a paginated list of books with optional filters
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {number} [req.query.page] - Page number for pagination
 * @param {number} [req.query.limit] - Number of records per page
 * @param {string} [req.query.search] - Search keyword
 * @param {string} [req.query.status] - Filter by book status
 * @param {string} req.requestId - Unique request identifier
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} If fetching books fails
 */

/**
 * @function getBookById
 * @desc Fetches a single book by its ID
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {number|string} req.params.id - Book ID
 * @param {string} req.requestId - Unique request identifier
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} If book is not found or fetch fails
 */



/**
 * @function deleteBook
 * @desc Deletes a book by its ID
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.params - Route parameters
 * @param {number|string} req.params.id - Book ID
 * @param {string} req.requestId - Unique request identifier
 *
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 *
 * @returns {Promise<void>}
 *
 * @throws {Error} If deletion fails
 *
 * */



const bookService = require("../services/bookService");
const { successResponse } = require("../utils/responseHandler");
const { bookRequestDto } = require("../DTO/bookRequestDto");

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

    const result = await bookService.upsertBook(
      id,
      bookData,
      req.file,
      requestId
    );

    logInfo("upsertBookController", LOG.MESSAGE.END, requestId, LOG.TYPE.UPSERT);

    return successResponse(
      res,
      result.statusCode,
      result.message,
      result.data 
    );

  } catch (error) {
    logError("upsertBookController", error, requestId, LOG.TYPE.UPSERT);
    next(error);
  }
};

//  GET ALL 
//  GET ALL 
exports.getBooks = async (req, res, next) => {
  const requestId = req.requestId;

  try {
    logInfo("getBooksController", LOG.MESSAGE.START, requestId, LOG.TYPE.FETCH);

    // PAGINATION 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const pagination = {
      skip: (page - 1) * limit,
      take: limit,
      page,
      limit,
    };

    //  FILTERS
    const filters = {
      search: req.query.search,
      status: req.query.status,
    };

    const result = await bookService.getBooks(
      pagination,
      filters,
      requestId
    );

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

//  GET BY ID 
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

//  DELETE
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