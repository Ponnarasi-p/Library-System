const prisma = require("../config/prismaClient");

exports.createBook = async (data, fileData) => {
  const book = await prisma.book.create({
    data: data,
  });

  // Save file metadata
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
};

exports.getBooks = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;

  if (page <= 0 || limit <= 0) {
    throw new Error("Invalid pagination parameters");
  }

  const skip = (page - 1) * limit;

  const filters = {
    is_deleted: false,
  };

  if (query.book_title) {
    filters.book_title = {
      contains: query.book_title,
    };
  }

  if (query.author_name) {
    filters.author_name = {
      contains: query.author_name,
    };
  }

  if (query.status) {
    filters.status = query.status;
  }

  let sort = {};
  if (query.sortBy) {
    sort[query.sortBy] = query.order === "desc" ? "desc" : "asc";
  }

  // ✅ Fetch books
  const books = await prisma.book.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: Object.keys(sort).length ? sort : undefined,
  });

  // ✅ Total count (🔥 FIX)
  const total = await prisma.book.count({
    where: filters,
  });

  // ✅ Get book IDs
  const bookIds = books.map((b) => b.book_id);

  // ✅ Fetch documents
  const documents = await prisma.document.findMany({
    where: {
      reference_id: { in: bookIds },
      reference_type: "BOOK",
    },
  });

  // ✅ Map cover
  const booksWithCover = books.map((book) => {
    const doc = documents.find(
      (d) => d.reference_id === book.book_id
    );

    return {
      ...book,
      cover_file: doc ? doc.file_path : null,
    };
  });

  return {
    total,
    page,
    limit,
    data: booksWithCover,
  };
};

exports.getBookById = async (id) => {
  return await prisma.book.findUnique({
    where: { book_id: parseInt(id) }
  });
};

exports.updateBook = async (id, data) => {
  return await prisma.book.update({
    where: { book_id: parseInt(id) },
    data: data
  });
};

exports.deleteBook = async (id) => {
  return await prisma.book.update({
    where: { book_id: parseInt(id) },
    data: { is_deleted: true, status: "INACTIVE" }
  });
};