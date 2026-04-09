const bookDal = require("../DAL/bookDal");

exports.upsertBook = async (id, data, fileData) => {
  try {
    return await bookDal.upsertBook(id, data, fileData);
  } catch (error) {
    throw error;
  }
};

exports.findDuplicate = async (data) => {
  try {
    return await bookDal.findDuplicate(data);
  } catch (error) {
    throw error;
  }
};

exports.getBooks = async (params) => {
  try {
    return await bookDal.getBooks(params);
  } catch (error) {
    throw error;
  }
};

exports.getBookById = async (id) => {
  try {
    return await bookDal.getBookById(id);
  } catch (error) {
    throw error;
  }
};

exports.deleteBook = async (id) => {
  try {
    return await bookDal.deleteBook(id);
  } catch (error) {
    throw error;
  }
};