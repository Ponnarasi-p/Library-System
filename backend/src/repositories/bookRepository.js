const bookDal = require("../DAL/bookDal");

exports.createBook = async (data, fileData) => {
  return await bookDal.createBook(data, fileData);
};
exports.getBooks = async (query) => {
  return await bookDal.getBooks(query);
};

exports.getBookById = async (id) => {
  return await bookDal.getBookById(id);
};

exports.updateBook = async (id, data) => {
  return await bookDal.updateBook(id, data);
};

exports.deleteBook = async (id) => {
  return await bookDal.deleteBook(id);
};