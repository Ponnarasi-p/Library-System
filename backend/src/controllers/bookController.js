import bookService from '../services/bookService.js';
import { successResponse } from '../utils/responseHandler.js';
import BookRequestDto from '../DTO/bookRequestDto.js';
import { bookListDto, bookResponseDto } from '../DTO/bookDto.js';

import HTTP from '../constants/httpStatusConstants.js';
import MESSAGE from '../constants/messages.js';
import { SYSTEM_CONSTANTS } from '../constants/systemConstant.js';

class BookController {

  upsertBook = async (req, res, next) => {
    try {
      const dto = new BookRequestDto(req.body);

      const result = await bookService.upsertBook(
        dto.id,
        dto.bookData,
        req.file,
        req.requestId
      );

      return successResponse(
        res,
        result.statusCode,
        result.message,
        result.data
      );
    } catch (error) {
      return next(error);
    }
  };

  getBooks = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || SYSTEM_CONSTANTS.DEFAULT_PAGE;
      const limit = parseInt(req.query.limit) || SYSTEM_CONSTANTS.PAGINATION;

      const pagination = {
        skip: (page - 1) * limit,
        take: limit,
        page,
        limit,
      };

      const filters = {
        search: req.query.search,
        status: req.query.status,
      };

      const result = await bookService.getBooks(
        pagination,
        filters,
        req.requestId
      );

      return successResponse(
        res,
        HTTP.OK,
        MESSAGE.BOOK_FETCH_SUCCESS,
        bookListDto(result.data),
        result.meta
      );
    } catch (error) {
      return next(error);
    }
  };

  getBookById = async (req, res, next) => {
    try {
      const result = await bookService.getBookById(
        req.params.id,
        req.requestId
      );

      return successResponse(
        res,
        HTTP.OK,
        MESSAGE.BOOK_FETCH_BY_ID_SUCCESS,
        bookResponseDto(result)
      );
    } catch (error) {
      return next(error);
    }
  };

  deleteBook = async (req, res, next) => {
    try {
      await bookService.deleteBook(
        req.params.id,
        req.requestId
      );

      return successResponse(
        res,
        HTTP.OK,
        MESSAGE.BOOK_DELETE_SUCCESS
      );
    } catch (error) {
      return next(error);
    }
  };
}

export default new BookController();