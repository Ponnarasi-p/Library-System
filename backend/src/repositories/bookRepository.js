const bookDal = require("../DAL/bookDal");



exports.upsertBook = (id, data, fileData) =>bookDal.upsertBook(id, data, fileData);

exports.findDuplicate = (data) =>bookDal.findDuplicate(data);

exports.getBooks = (params) =>bookDal.getBooks(params);

exports.getBookById = (id) =>bookDal.getBookById(id);

exports.deleteBook = (id) =>bookDal.deleteBook(id);