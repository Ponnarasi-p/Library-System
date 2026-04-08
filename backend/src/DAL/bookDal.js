const prisma = require("../config/prismaClient");
const fs = require("fs");
const path = require("path");

// ===============================
// 🔹 UPSERT BOOK (DB ONLY)
// ===============================
exports.upsertBook = async (id, data, fileData) => {
  // CREATE
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

  // UPDATE
  const updatedBook = await prisma.book.update({
    where: { book_id: parseInt(id) },
    data,
  });

  // FILE UPSERT
  if (fileData) {
    const existingDoc = await prisma.document.findFirst({
      where: {
        reference_id: parseInt(id),
        reference_type: "BOOK",
      },
    });

    if (existingDoc) {
      // DELETE OLD FILE (safe)
      if (existingDoc.file_path) {
        const oldPath = path.resolve(existingDoc.file_path);
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
          } catch (e) {
            console.error("File delete failed:", e.message);
          }
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

// ===============================
// 🔹 FIND DUPLICATE (USED IN SERVICE)
// ===============================
exports.findDuplicate = async (title, author) => {
  return await prisma.book.findFirst({
    where: {
      book_title: title,
      author_name: author,
      is_deleted: false,
    },
  });
};

// ===============================
// 🔹 GET ALL BOOKS (NO LOGIC)
// ===============================
exports.getBooks = async (query) => {
  const where = {
    is_deleted: false,

    ...(query.status && { status: query.status }),

    ...(query.search && {
      OR: [
        {
          book_title: {
            contains: query.search,
          },
        },
        {
          author_name: {
            contains: query.search,
          },
        },
      ],
    }),
  };

  const [data, total] = await Promise.all([
    prisma.book.findMany({
      where,
      skip: query.skip,
      take: query.limit,
      orderBy: { book_id: "desc" },
      include: {
        documents: true,
      },
    }),
    prisma.book.count({ where }),
  ]);

  return {
    data,
    total,
    page: query.page,
    limit: query.limit,
  };
};

// ===============================
// 🔹 GET BOOK BY ID
// ===============================
exports.getBookById = async (id) => {
  return await prisma.book.findFirst({
    where: {
      book_id: parseInt(id),
      is_deleted: false,
    },
    include: {
      documents: true,
    },
  });
};

// ===============================
// 🔹 DELETE BOOK (SOFT DELETE)
// ===============================
exports.deleteBook = async (id) => {
  return await prisma.book.update({
    where: { book_id: parseInt(id) },
    data: { is_deleted: true },
  });
};