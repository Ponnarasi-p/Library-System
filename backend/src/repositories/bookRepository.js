const bookDal = require("../DAL/bookDal");

const LOG = require("../constants/logConstants");
const { logInfo, logError } = require("../utils/logHelper");

// UPSERT
exports.upsertBook = async (id, data, fileData, requestId) => { //Same parameters passed from service
  try {
    logInfo("upsertBookRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await bookDal.upsertBook(id, data, fileData, requestId); //Calls DAL (actual DB operation)

    logInfo("upsertBookRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return result;

  } catch (error) {
    logError("upsertBookRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// DUPLICATE-same book title and not deleted.
exports.findDuplicate = async (data, requestId) => {
  try {
    logInfo("findDuplicateRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await bookDal.findDuplicate(data, requestId);

    logInfo("findDuplicateRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return result;

  } catch (error) {
    logError("findDuplicateRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// GET ALL
exports.getBooks = async (params, requestId) => {
  try {
    logInfo("getBooksRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await bookDal.getBooks(params, requestId);

    logInfo("getBooksRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return result;

  } catch (error) {
    logError("getBooksRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// GET BY ID
exports.getBookById = async (id, requestId) => {
  try {
    logInfo("getBookByIdRepository", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const result = await bookDal.getBookById(id, requestId);

    logInfo("getBookByIdRepository", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return result;

  } catch (error) {
    logError("getBookByIdRepository", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// DELETE
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