import bookRepository from '../repositories/bookRepository.js';

import HTTP from '../constants/httpStatusConstants.js';
import MESSAGE from '../constants/messages.js';

import LOG from '../constants/logConstants.js';
import { logInfo, logError } from '../utils/logHelper.js';

import { buildFileData } from '../utils/fileBuilder.js';

class BookService {

  /**
   * Handle duplicate book validation
   */
  async handleDuplicate(data, id, requestId) {
    if (!data.book_title) return;

    const duplicate = await bookRepository.findDuplicate(data, requestId);

    if (duplicate && (!id || duplicate.book_id !== parseInt(id))) {
      throw {
        status: HTTP.BAD_REQUEST,
        message: MESSAGE.BOOK_ALREADY_EXISTS,
      };
    }
  }

  /**
   * Handle create or update logic
   */
  async handleCreateOrUpdate(id, data, requestId) {
    if (!id) {
      data.available_copies = data.total_copies;
      return await bookRepository.createBook(data, requestId);
    }

    const existing = await bookRepository.getBookById(id, requestId);

    if (!existing) {
      throw {
        status: HTTP.NOT_FOUND,
        message: MESSAGE.BOOK_NOT_FOUND,
      };
    }

    return await bookRepository.updateBook(id, data, requestId);
  }

  /**
   * Handle file upload logic
   */
  async handleFile(book, file, requestId) {
    if (!file) return;

    const fileData = buildFileData(file);
    const doc = await bookRepository.findDocument(book.book_id, requestId);

    if (doc) {
      await bookRepository.updateDocument(doc.document_id, fileData, requestId);
    } else {
      await bookRepository.createDocument(book.book_id, fileData, requestId);
    }
  }

  /**
   * UPSERT BOOK (Create + Update)
   */
  async upsertBook(id, data, file, requestId) {
    const FN = 'upsertBookService';

    try {
      logInfo(FN, LOG.MESSAGE.START, requestId, LOG.TYPE.UPSERT);

      // Step 1: Duplicate check
      await this.handleDuplicate(data, id, requestId);

      // Step 2: Create or update
      const book = await this.handleCreateOrUpdate(id, data, requestId);

      // Step 3: File handling
      await this.handleFile(book, file, requestId);

      logInfo(FN, LOG.MESSAGE.END, requestId, LOG.TYPE.UPSERT);

      return {
        statusCode: id ? HTTP.OK : HTTP.CREATED,
        message: id
          ? MESSAGE.BOOK_UPDATE_SUCCESS
          : MESSAGE.BOOK_CREATE_SUCCESS,
        data: book,
      };

    } catch (error) {
      logError(FN, error, requestId, LOG.TYPE.UPSERT);
      throw error;
    }
  }

  /**
   * GET ALL BOOKS
   */
  async getBooks(pagination, filters, requestId) {
    const result = await bookRepository.getBooks(
      { ...pagination, ...filters },
      requestId
    );

    return {
      data: result.data,
      meta: {
        total: result.total,
        page: pagination.page,
        limit: pagination.limit,
      },
    };
  }

  /**
   * GET BOOK BY ID
   */
  async getBookById(id, requestId) {
    const book = await bookRepository.getBookById(id, requestId);

    if (!book) {
      throw {
        status: HTTP.NOT_FOUND,
        message: MESSAGE.BOOK_NOT_FOUND,
      };
    }

    return book;
  }

  /**
   * DELETE BOOK
   */
  async deleteBook(id, requestId) {
    const existing = await bookRepository.getBookById(id, requestId);

    if (!existing) {
      throw {
        status: HTTP.NOT_FOUND,
        message: MESSAGE.BOOK_NOT_FOUND,
      };
    }

    await bookRepository.deleteBook(id, requestId);
  }
}

export default new BookService();