/**
 * @module bookDAL
 * @desc Handles all database operations related to books and documents
 *       using Prisma ORM.
 *
 * @requires ../config/prismaClient
 * @requires ../constants/logConstants
 * @requires ../utils/logHelper
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
/**
 * @function createBook
 * @desc Creates a new book record in the database
 *
 * @param {Object} data - Book data to be inserted
 * @param {string} requestId - Unique request identifier for logging
 *
 * @returns {Promise<Object>} Created book record
 *
 * @throws {Error} If database operation fails
 */

/**
 * @function updateBook
 * @desc Updates an existing book record by ID
 *
 * @param {number|string} id - Book ID
 * @param {Object} data - Updated book data
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Updated book record
 *
 * @throws {Error} If update fails
 */

/**
 * @function findDocument
 * @desc Finds a document associated with a book
 *
 * @param {number|string} bookId - Book ID reference
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object|null>} Document record or null
 *
 * @throws {Error} If query fails
 */

/**
 * @function createDocument
 * @desc Creates a document linked to a book
 *
 * @param {number} bookId - Book ID
 * @param {Object} fileData - File metadata (name, path, etc.)
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Created document record
 *
 * @throws {Error} If creation fails
 */
/**
 * @function updateDocument
 * @desc Updates an existing document record
 *
 * @param {number} docId - Document ID
 * @param {Object} fileData - Updated file data
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Updated document record
 *
 * @throws {Error} If update fails
 */
/**
 * @function findDuplicate
 * @desc Checks if a book with the same title already exists
 *
 * @param {Object} data - Book data (used for duplicate check)
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object|null>} Existing book if duplicate found
 *
 * @throws {Error} If query fails
 */

/**
 * @function getBooks
 * @desc Retrieves paginated list of books with filters
 *
 * @param {Object} params - Pagination and filter parameters
 * @param {number} params.skip - Records to skip
 * @param {number} params.take - Records to fetch
 * @param {string} [params.status] - Filter by status
 * @param {string} [params.search] - Search keyword
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Object containing books data and total count
 *
 * @throws {Error} If query fails
 */

/**
 * @function getBookById
 * @desc Retrieves a single book by ID
 *
 * @param {number|string} id - Book ID
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object|null>} Book record with documents
 *
 * @throws {Error} If query fails
 */

/**
 * @function deleteBook
 * @desc Soft deletes a book by marking it as deleted
 *
 * @param {number|string} id - Book ID
 * @param {string} requestId - Request identifier
 *
 * @returns {Promise<Object>} Updated book record
 *
 * @throws {Error} If deletion fails
 */


const prisma = require("../config/prismaClient");

const LOG = require("../constants/logConstants");
const { logInfo, logError } = require("../utils/logHelper");

// CREATE
exports.createBook = async (data, requestId) => {
  try {
    logInfo("createBookDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await prisma.book.create({ data });

    logInfo("createBookDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
    return result;

  } catch (error) {
    logError("createBookDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// UPDATE
exports.updateBook = async (id, data, requestId) => {
  try {
    logInfo("updateBookDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await prisma.book.update({
      where: { book_id: parseInt(id) },
      data,
    });

    logInfo("updateBookDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
    return result;

  } catch (error) {
    logError("updateBookDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// FIND DOCUMENT
exports.findDocument = async (bookId, requestId) => {
  try {
    logInfo("findDocumentDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await prisma.document.findFirst({
      where: {
        reference_id: parseInt(bookId),
        reference_type: "BOOK",
      },
    });

    logInfo("findDocumentDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
    return result;

  } catch (error) {
    logError("findDocumentDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// CREATE DOCUMENT
exports.createDocument = async (bookId, fileData, requestId) => {
  try {
    logInfo("createDocumentDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await prisma.document.create({
      data: {
        reference_id: bookId,
        reference_type: "BOOK",
        ...fileData,
      },
    });

    logInfo("createDocumentDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
    return result;

  } catch (error) {
    logError("createDocumentDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// UPDATE DOCUMENT
exports.updateDocument = async (docId, fileData, requestId) => {
  try {
    logInfo("updateDocumentDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await prisma.document.update({
      where: { document_id: docId },
      data: fileData,
    });

    logInfo("updateDocumentDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
    return result;

  } catch (error) {
    logError("updateDocumentDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// FIND DUPLICATE
exports.findDuplicate = async (data, requestId) => {
  try {
    logInfo("findDuplicateDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await prisma.book.findFirst({
      where: {
        book_title: data.book_title,
        is_deleted: false,
      },
    });

    logInfo("findDuplicateDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
    return result;

  } catch (error) {
    logError("findDuplicateDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// GET ALL
exports.getBooks = async (params, requestId) => {
  try {
    logInfo("getBooksDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const where = {
      is_deleted: false,
      ...(params.status && { status: params.status }),
      ...(params.search && {
        OR: [
          { book_title: { contains: params.search } },
          { author_name: { contains: params.search } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.book.findMany({
        where,
        skip: params.skip,
        take: params.take,
        orderBy: { book_id: "desc" },
        include: { documents: true },
      }),
      prisma.book.count({ where }),
    ]);

    logInfo("getBooksDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return { data, total };

  } catch (error) {
    logError("getBooksDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// GET BY ID
exports.getBookById = async (id, requestId) => {
  try {
    logInfo("getBookByIdDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await prisma.book.findFirst({
      where: { book_id: parseInt(id), is_deleted: false },
      include: { documents: true },
    });

    logInfo("getBookByIdDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
    return result;

  } catch (error) {
    logError("getBookByIdDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// DELETE
exports.deleteBook = async (id, requestId) => {
  try {
    logInfo("deleteBookDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await prisma.book.update({
      where: { book_id: parseInt(id) },
      data: { is_deleted: true },
    });

    logInfo("deleteBookDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
    return result;

  } catch (error) {
    logError("deleteBookDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};