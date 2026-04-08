const prisma = require("../config/prismaClient");
const fs = require("fs");
const path = require("path");

// UPSERT
exports.upsertBook = async (id, data, fileData) => {
  if (!id) {
    const book = await prisma.book.create({ data });

    if (fileData) {
      await prisma.document.create({
        data: {
          reference_id: book.book_id,
          reference_type: "BOOK",
          ...fileData,
        },
      });
    }

    return book;
  }

  const updatedBook = await prisma.book.update({
    where: { book_id: parseInt(id) },
    data,
  });

  if (fileData) {
    const existingDoc = await prisma.document.findFirst({
      where: {
        reference_id: parseInt(id),
        reference_type: "BOOK",
      },
    });

    if (existingDoc) {
      if (existingDoc.file_path) {
        const oldPath = path.resolve(existingDoc.file_path);

        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch {}
        }
      }

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

  return updatedBook;
};

// DUPLICATE
exports.findDuplicate = async (data) => {
  return await prisma.book.findFirst({
    where: {
      book_title: data.book_title,
      is_deleted: false,
    },
  });
};

// ✅ GET ALL (FIXED PAGINATION)
exports.getBooks = async (params) => {
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
      take: params.take, // ✅ FIXED (IMPORTANT)
      orderBy: { book_id: "desc" },
      include: { documents: true },
    }),
    prisma.book.count({ where }),
  ]);

  return { data, total };
};

// GET BY ID
exports.getBookById = async (id) => {
  return await prisma.book.findFirst({
    where: {
      book_id: parseInt(id),
      is_deleted: false,
    },
    include: { documents: true },
  });
};

// DELETE
exports.deleteBook = async (id) => {
  return await prisma.book.update({
    where: { book_id: parseInt(id) },
    data: { is_deleted: true },
  });
};