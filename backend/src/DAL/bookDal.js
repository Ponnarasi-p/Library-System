import prisma from '../config/prismaClient.js';
import LOG from '../constants/logConstants.js';
import { logInfo, logError } from '../utils/logHelper.js';

class BookRepository {

  async createBook(data, requestId) {
    try {
      logInfo('createBookDAL', LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

      const result = await prisma.book.create({ data });

      logInfo('createBookDAL', LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
      return result;

    } catch (error) {
      logError('createBookDAL', error, requestId, LOG.TYPE.QUERY);
      throw error;
    }
  }

  async updateBook(id, data, requestId) {
    try {
      logInfo('updateBookDAL', LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

      const result = await prisma.book.update({
        where: { book_id: parseInt(id) },
        data,
      });

      logInfo('updateBookDAL', LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);
      return result;

    } catch (error) {
      logError('updateBookDAL', error, requestId, LOG.TYPE.QUERY);
      throw error;
    }
  }

  async findDuplicate(data, requestId) {
    try {
      logInfo('findDuplicateDAL', LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

      return await prisma.book.findFirst({
        where: {
          book_title: data.book_title,
          is_deleted: false,
        },
      });

    } catch (error) {
      logError('findDuplicateDAL', error, requestId, LOG.TYPE.QUERY);
      throw error;
    }
  }

  async getBooks(params, requestId) {
    try {
      logInfo('getBooksDAL', LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

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
          include: { documents: true },
        }),
        prisma.book.count({ where }),
      ]);

      return { data, total };

    } catch (error) {
      logError('getBooksDAL', error, requestId, LOG.TYPE.QUERY);
      throw error;
    }
  }

  async getBookById(id, requestId) {
    logInfo('getBookByIdDAL', LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    return prisma.book.findFirst({
      where: { book_id: parseInt(id), is_deleted: false },
      include: { documents: true },
    });
  }

  async deleteBook(id, requestId) {
    logInfo('deleteBookDAL', LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    return prisma.book.update({
      where: { book_id: parseInt(id) },
      data: { is_deleted: true },
    });
  }
}

export default new BookRepository();