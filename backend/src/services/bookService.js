const bookRepository = require("../repositories/bookRepository");
const { bookResponseDto, bookListDto } = require("../DTO/bookDto"); //Converts DB → API response
const { paginationDto } = require("../DTO/paginationDto");
const { buildFileData } = require("../utils/fileBuilder"); //Converts uploaded file → DB format

const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

const LOG = require("../constants/logConstants");
const { logInfo, logError, logWarn } = require("../utils/logHelper");

// UPSERT 
exports.upsertBook = async (id, data, file, requestId) => {
  try {
    logInfo("upsertBookService", LOG.MESSAGE.START, requestId, LOG.TYPE.UPSERT);

    const fileData = buildFileData(file);

    if (!id) {
      const duplicate = await bookRepository.findDuplicate(data, requestId);

      if (duplicate) {
        logWarn("upsertBookService", "Duplicate book", requestId, LOG.TYPE.UPSERT);
        throw {
          status: HTTP.BAD_REQUEST,
          message: MESSAGE.BOOK_ALREADY_EXISTS,
        };
      }

      data.available_copies = data.total_copies;
    }

    if (id) {
      const existing = await bookRepository.getBookById(id, requestId);

      if (!existing) {
        logWarn("upsertBookService", "Book not found", requestId, LOG.TYPE.UPSERT);
        throw {
          status: HTTP.NOT_FOUND,
          message: MESSAGE.BOOK_NOT_FOUND,
        };
      }
    }

    const book = await bookRepository.upsertBook(id, data, fileData, requestId);

    logInfo("upsertBookService", LOG.MESSAGE.END, requestId, LOG.TYPE.UPSERT);

    return bookResponseDto(book);

  } catch (error) {
    logError("upsertBookService", error, requestId, LOG.TYPE.UPSERT);
    throw error;
  }
};

//  GET ALL 
exports.getBooks = async (query, requestId) => {
  try {
    logInfo("getBooksService", LOG.MESSAGE.START, requestId, LOG.TYPE.FETCH);

    const pagination = paginationDto(query);

    const result = await bookRepository.getBooks({
      skip: pagination.skip,
      take: pagination.take,
      search: query.search,
      status: query.status,
    }, requestId);

    logInfo("getBooksService", LOG.MESSAGE.END, requestId, LOG.TYPE.FETCH);

    return {
      data: bookListDto(result.data),  //Converts array → DTO format
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

//  GET BY ID 
exports.getBookById = async (id, requestId) => {
  try {
    logInfo("getBookByIdService", LOG.MESSAGE.START, requestId, LOG.TYPE.FETCH);

    const book = await bookRepository.getBookById(id, requestId);

    if (!book) {
      logWarn("getBookByIdService", "Book not found", requestId, LOG.TYPE.FETCH);
      throw {
        status: HTTP.NOT_FOUND,
        message: MESSAGE.BOOK_NOT_FOUND,
      };
    }

    logInfo("getBookByIdService", LOG.MESSAGE.END, requestId, LOG.TYPE.FETCH);

    return bookResponseDto(book);

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
      logWarn("deleteBookService", "Book not found", requestId, LOG.TYPE.DELETE);
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