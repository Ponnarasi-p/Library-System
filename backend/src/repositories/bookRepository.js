const bookDal = require("../DAL/bookDal");

exports.upsertBook = async (id, data, fileData) => {
  return await bookDal.upsertBook(id, data, fileData);
};

exports.findDuplicate = async (data) => {
  return await bookDal.findDuplicate(data);
};

exports.getBooks = async (params) => {
  return await bookDal.getBooks(params);
};

exports.getBookById = async (id) => {
  return await bookDal.getBookById(id);
};

exports.deleteBook = async (id) => {
  return await bookDal.deleteBook(id);
};