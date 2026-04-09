const prisma = require("../config/prismaClient");
const fs = require("fs");
const path = require("path");

// ================= UPSERT =================
exports.upsertBook = async (id, data, fileData) => {
  try {
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

    // HANDLE FILE
    if (fileData) {
      const existingDoc = await prisma.document.findFirst({
        where: {
          reference_id: parseInt(id),
          reference_type: "BOOK",
        },
      });

      if (existingDoc) {
        // DELETE OLD FILE SAFELY
        if (existingDoc.file_path) {
          const oldPath = path.resolve(existingDoc.file_path);

          if (fs.existsSync(oldPath)) {
            try {
              fs.unlinkSync(oldPath);
            } catch (err) {
              console.log("File delete failed:", err);
            }
          }
        }

        // UPDATE DOCUMENT
        await prisma.document.update({
          where: { document_id: existingDoc.document_id },
          data: fileData,
        });

      } else {
        // CREATE DOCUMENT
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

  } catch (error) {
    console.error("DAL UPSERT ERROR:", error);
    throw error;
  }
};


// ================= DUPLICATE =================
exports.findDuplicate = async (data) => {
  try {
    return await prisma.book.findFirst({
      where: {
        book_title: data.book_title,
        is_deleted: false,
      },
    });
  } catch (error) {
    console.error("DAL DUPLICATE ERROR:", error);
    throw error;
  }
};


// ================= GET ALL =================
exports.getBooks = async (params) => {
  try {
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

    return { data, total };

  } catch (error) {
    console.error("DAL GET BOOKS ERROR:", error);
    throw error;
  }
};


// ================= GET BY ID =================
exports.getBookById = async (id) => {
  try {
    return await prisma.book.findFirst({
      where: {
        book_id: parseInt(id),
        is_deleted: false,
      },
      include: { documents: true },
    });
  } catch (error) {
    console.error("DAL GET BY ID ERROR:", error);
    throw error;
  }
};


// ================= DELETE =================
exports.deleteBook = async (id) => {
  try {
    return await prisma.book.update({
      where: { book_id: parseInt(id) },
      data: { is_deleted: true },
    });
  } catch (error) {
    console.error("DAL DELETE ERROR:", error);
    throw error;
  }
};