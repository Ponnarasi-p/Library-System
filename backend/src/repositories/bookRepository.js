const bookDal = require("../DAL/bookDal");

exports.upsertBook = async (id, data, fileData) => {
  return await bookDal.upsertBook(id, data, fileData);
};

exports.getBooks = async (query) => {
  return await bookDal.getBooks(query);
};

exports.getBookById = async (id) => {
  return await bookDal.getBookById(id);
};

exports.deleteBook = async (id) => {
  return await bookDal.deleteBook(id);
};