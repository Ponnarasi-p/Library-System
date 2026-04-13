/**
 * @module bookService
 * @desc Handles business logic for book operations including create/update (upsert),
 *       retrieval, deletion, duplicate checks, and document handling.
 *
 * @requires ../repositories/bookRepository
 * @requires ../utils/fileBuilder
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
 * @desc Creates a new book or updates an existing one.
 *       Also handles duplicate checks and document (file) operations.
 *
 * @param {number|null} id - Book ID (null for create, value for update)
 * @param {Object} data - Book data
 * @param {Object} file - Uploaded file (optional)
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Response object containing statusCode, message, and book data
 *
 * @throws {Error} If duplicate exists, book not found, or DB operation fails
 */

/**
 * @function getBooks
 * @desc Retrieves paginated list of books with optional filters
 *
 * @param {Object} pagination - Pagination details (skip, take, page, limit)
 * @param {Object} filters - Filter options (search, status)
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Object containing book data and metadata
 *
 * @throws {Error} If fetch fails
 */
/**
 * @function getBookById
 * @desc Retrieves a single book by ID
 *
 * @param {number|string} id - Book ID
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Book data
 *
 * @throws {Error} If book not found or fetch fails
 */
/**
 * @function deleteBook
 * @desc Soft deletes a book by marking it as deleted
 *
 * @param {number|string} id - Book ID
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<boolean>} True if deletion successful
 *
 * @throws {Error} If book not found or deletion fails
 */



const bookRepository = require("../repositories/bookRepository");
const { buildFileData } = require("../utils/fileBuilder");


const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

const LOG = require("../constants/logConstants");
const { logInfo, logError, logWarn } = require("../utils/logHelper");

//  UPSERT 
 
exports.upsertBook = async (id, data, file, requestId) => {
  try {
    logInfo("upsertBookService", LOG.MESSAGE.START, requestId, LOG.TYPE.UPSERT);

    let statusCode;
    let message;
    let book;

    // COMMON DUPLICATE CHECK (FOR CREATE + UPDATE)
    if (data.book_title) {
      const duplicate = await bookRepository.findDuplicate(data, requestId);

      if (
        duplicate &&
        (!id || duplicate.book_id !== parseInt(id)) 
      ) {
        logWarn(
          "upsertBookService",
          MESSAGE.BOOK_ALREADY_EXISTS,
          requestId,
          LOG.TYPE.UPSERT
        );

        throw {
          status: HTTP.BAD_REQUEST,
          message: MESSAGE.BOOK_ALREADY_EXISTS,
        };
      }
    }

    //CREATE 
    if (!id) {
      data.available_copies = data.total_copies;

      book = await bookRepository.createBook(data, requestId);

      statusCode = HTTP.CREATED;
      message = MESSAGE.BOOK_CREATE_SUCCESS;
    }

    //  UPDATE 
    else {
      const existing = await bookRepository.getBookById(id, requestId);

      if (!existing) {
        logWarn(
          "upsertBookService",
          MESSAGE.BOOK_NOT_FOUND,
          requestId,
          LOG.TYPE.UPSERT
        );

        throw {
          status: HTTP.NOT_FOUND,
          message: MESSAGE.BOOK_NOT_FOUND,
        };
      }

      book = await bookRepository.updateBook(id, data, requestId);

      statusCode = HTTP.OK;
      message = MESSAGE.BOOK_UPDATE_SUCCESS;
    }

    // FILE HANDLING 
    if (file) {
      const fileData = buildFileData(file);

      const existingDoc = await bookRepository.findDocument(
        book.book_id,
        requestId
      );

      if (existingDoc) {
        await bookRepository.updateDocument(
          existingDoc.document_id,
          fileData,
          requestId
        );
      } else {
        await bookRepository.createDocument(
          book.book_id,
          fileData,
          requestId
        );
      }
    }

    logInfo("upsertBookService", LOG.MESSAGE.END, requestId, LOG.TYPE.UPSERT);

    return {
      statusCode,
      message,
      data: book,
    };

  } catch (error) {
    logError("upsertBookService", error, requestId, LOG.TYPE.UPSERT);
    throw error;
  }
};

//  GET ALL  
exports.getBooks = async (pagination, filters, requestId) => {
  try {
    logInfo("getBooksService", LOG.MESSAGE.START, requestId, LOG.TYPE.FETCH);

    const result = await bookRepository.getBooks(
      {
        skip: pagination.skip,
        take: pagination.take,
        search: filters.search,
        status: filters.status,
      },
      requestId
    );

    logInfo("getBooksService", LOG.MESSAGE.END, requestId, LOG.TYPE.FETCH);

    return {
      data: result.data,
      meta: {
        total: result.total,
        page: pagination.page,
        limit: pagination.limit,
      },
    };

  } catch (error) {
    logError("getBooksService", error, requestId, LOG.TYPE.FETCH);
    throw error;
  }
};

// GET BY ID 
exports.getBookById = async (id, requestId) => {
  try {
    logInfo("getBookByIdService", LOG.MESSAGE.START, requestId, LOG.TYPE.FETCH);

    const book = await bookRepository.getBookById(id, requestId);

    if (!book) {
      logWarn(
        "getBookByIdService",
        MESSAGE.BOOK_NOT_FOUND,
        requestId,
        LOG.TYPE.FETCH
      );

      throw {
        status: HTTP.NOT_FOUND,
        message: MESSAGE.BOOK_NOT_FOUND,
      };
    }

    logInfo("getBookByIdService", LOG.MESSAGE.END, requestId, LOG.TYPE.FETCH);

    return book; 
  } catch (error) {
    logError("getBookByIdService", error, requestId, LOG.TYPE.FETCH);
    throw error;
  }
};

// DELETE
exports.deleteBook = async (id, requestId) => {
  try {
    logInfo("deleteBookService", LOG.MESSAGE.START, requestId, LOG.TYPE.DELETE);

    const existing = await bookRepository.getBookById(id, requestId);

    if (!existing) {
      logWarn(
        "deleteBookService",
        MESSAGE.BOOK_NOT_FOUND,
        requestId,
        LOG.TYPE.DELETE
      );

      throw {
        status: HTTP.NOT_FOUND,
        message: MESSAGE.BOOK_NOT_FOUND,
      };
    }

    await bookRepository.deleteBook(id, requestId);

    logInfo("deleteBookService", LOG.MESSAGE.END, requestId, LOG.TYPE.DELETE);

    return true;
  } catch (error) {
    logError("deleteBookService", error, requestId, LOG.TYPE.DELETE);
    throw error;
  }
};