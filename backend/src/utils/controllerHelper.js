const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

exports.buildUpsertResponse = (id) => {
  return {
    statusCode: id ? HTTP.OK : HTTP.CREATED,
    message: id
      ? MESSAGE.BOOK_UPDATE_SUCCESS
      : MESSAGE.BOOK_CREATE_SUCCESS,
  };
};