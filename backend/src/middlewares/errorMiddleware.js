const { errorResponse } = require("../utils/responseHandler");
const HTTP = require("../constants/httpStatusConstants");

module.exports = (err, req, res, next) => {
  console.error(err);

  return errorResponse(
    res,
    err.status || HTTP.INTERNAL_SERVER_ERROR,
    err.message || "internal_server_error",
    err.description || "Something went wrong"
  );
};