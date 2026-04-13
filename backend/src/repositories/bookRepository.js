/**
 * @module bookService
 * @desc Handles business logic for book operations.
 *       Acts as an intermediary between Controller and DAL.
 *       Applies transformations using DTOs and manages workflows.
 *
 * @requires ../DAL/bookDal
 * @requires ../DTO/bookDto
 * @requires ../constants/logConstants
 * @requires ../utils/logHelper
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @function createBook
 * @desc Creates a new book and returns formatted response
 *
 * @param {Object} data - Book data
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Created book (formatted DTO)
 *
 * @throws {Error} If creation fails
 */

/**
 * @function updateBook
 * @desc Updates an existing book and returns formatted response
 *
 * @param {number|string} id - Book ID
 * @param {Object} data - Updated book data
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Updated book (formatted DTO)
 *
 * @throws {Error} If update fails
 */


/**
 * @function findDuplicate
 * @desc Checks if a book already exists (used before create)
 *
 * @param {Object} data - Book data
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object|null>} Existing book or null
 *
 * @throws {Error} If query fails
 */

/**
 * @function getBookById
 * @desc Retrieves a single book by ID and formats response
 *
 * @param {number|string} id - Book ID
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object|null>} Book DTO
 *
 * @throws {Error} If fetch fails
 */

/**
 * @function findDocument
 * @desc Retrieves document linked to a book
 *
 * @param {number} bookId - Book ID
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object|null>} Document record
 */
/**
 * @function createDocument
 * @desc Creates a document for a book
 *
 * @param {number} bookId - Book ID
 * @param {Object} fileData - File metadata
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Created document
 */

/**
 * @function updateDocument
 * @desc Updates an existing document
 *
 * @param {number} docId - Document ID
 * @param {Object} fileData - Updated file data
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Updated document
 */

/**
 * @function getBooks
 * @desc Retrieves paginated list of books and formats response
 *
 * @param {Object} params - Pagination and filters
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Object containing formatted books and total count
 *
 * @throws {Error} If fetch fails
 */


/**
 * @function deleteBook
 * @desc Soft deletes a book
 *
 * @param {number|string} id - Book ID
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Updated book record
 *
 * @throws {Error} If deletion fails
 */



const bookDal = require("../DAL/bookDal");
const { bookResponseDto, bookListDto } = require("../DTO/bookDto");

const LOG = require("../constants/logConstants");
const { logInfo, logError } = require("../utils/logHelper");

// CREATE 
exports.createBook = async (data, requestId) => {
  try {
    logInfo("createBookRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await bookDal.createBook(data, requestId);

    logInfo("createBookRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return bookResponseDto(result); 

  } catch (error) {
    logError("createBookRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

//  UPDATE 
exports.updateBook = async (id, data, requestId) => {
  try {
    logInfo("updateBookRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await bookDal.updateBook(id, data, requestId);

    logInfo("updateBookRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return bookResponseDto(result); 

  } catch (error) {
    logError("updateBookRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// FIND DUPLICATE 
exports.findDuplicate = async (data, requestId) => {
  try {
    logInfo("findDuplicateRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await bookDal.findDuplicate(data, requestId);

    logInfo("findDuplicateRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return result; //  no DTO (internal use)

  } catch (error) {
    logError("findDuplicateRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// GET BY ID 
exports.getBookById = async (id, requestId) => {
  try {
    logInfo("getBookByIdRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const data = await bookDal.getBookById(id, requestId);

    // logInfo("getBookByIdRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

   const result= bookResponseDto(data) ; 
    logInfo("getBookByIdRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
    return result;

  } catch (error) {
    logError("getBookByIdRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

//  DOCUMENT 
exports.findDocument = async (bookId, requestId) => {
  try {
    const result = await bookDal.findDocument(bookId, requestId);
    return result;
  } catch (error) {
    logError("findDocumentRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

exports.createDocument = async (bookId, fileData, requestId) => {
  try {
    return await bookDal.createDocument(bookId, fileData, requestId);
  } catch (error) {
    logError("createDocumentRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

exports.updateDocument = async (docId, fileData, requestId) => {
  try {
    return await bookDal.updateDocument(docId, fileData, requestId);
  } catch (error) {
    logError("updateDocumentRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// GET ALL 
exports.getBooks = async (params, requestId) => {
  try {
    logInfo("getBooksRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await bookDal.getBooks(params, requestId);

    logInfo("getBooksRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return {
      data: bookListDto(result.data), 
      total: result.total,
    };

  } catch (error) {
    logError("getBooksRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

//  DELETE 
exports.deleteBook = async (id, requestId) => {
  try {
    logInfo("deleteBookRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await bookDal.deleteBook(id, requestId);

    logInfo("deleteBookRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return result;

  } catch (error) {
    logError("deleteBookRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};