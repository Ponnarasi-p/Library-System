const prisma = require("../config/prismaClient");

const LOG = require("../constants/logConstants");
const { logInfo, logError } = require("../utils/logHelper");

// UPSERT
exports.upsertBook = async (id, data, fileData, requestId) => {
  try {
    logInfo("upsertBookDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    let result;

    // CREATE
    if (!id) {
      result = await prisma.book.create({ data });

      //  SAVE FILE
      if (fileData) {
        await prisma.document.create({
          data: {
            reference_id: result.book_id,
            reference_type: "BOOK",
            ...fileData,
          },
        });
      }

    } else {
      // UPDATE
      result = await prisma.book.update({
        where: { book_id: parseInt(id) },
        data,
      });

      // HANDLE FILE UPDATE
      if (fileData) {
        const existingDoc = await prisma.document.findFirst({
          where: {
            reference_id: parseInt(id),
            reference_type: "BOOK",
          },
        });

        if (existingDoc) {
          await prisma.document.update({
            where: { document_id: existingDoc.document_id },
            data: fileData,
          });
        } else {
          await prisma.document.create({
            data: {
              reference_id: parseInt(id),
              reference_type: "BOOK",
              ...fileData,
            },
          });
        }
      }
    }

    logInfo("upsertBookDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY);

    return result;

  } catch (error) {
    logError("upsertBookDAL", error, requestId, LOG.TYPE.QUERY);
    throw error;
  }
};

// GET ALL

exports.getBooks = async (params, requestId) => {
  try {
    logInfo("getBooksDAL", LOG.MESSAGE.START, requestId, LOG.TYPE.QUERY);

    const where = {
      is_deleted: false,

      ...(params.status && {
        status: params.status,
      }),

      ...(params.search && {
        OR: [
          {
            book_title: {
              contains: params.search, 
            },
          },
          {
            author_name: {
              contains: params.search,
            },
          },
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

      prisma.book.count({
        where,
      }),
    ]);

    logInfo("getBooksDAL", LOG.MESSAGE.END, requestId, LOG.TYPE.QUERY, {
      records: data.length,
    });

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

//  DUPLICATE 
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