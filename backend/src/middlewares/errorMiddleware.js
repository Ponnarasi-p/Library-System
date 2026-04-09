const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");
const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  logger.error({
    message: err.message,
    url: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  return res.status(err.status || HTTP.INTERNAL_SERVER_ERROR).json({
    code: err.status || HTTP.INTERNAL_SERVER_ERROR,
    status: "error",
    message: err.message || MESSAGE.INTERNAL_ERROR,
    description: err.description || "Something went wrong",
    data: [],
  });
};