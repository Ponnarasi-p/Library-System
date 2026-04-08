const HTTP = require("../constants/httpStatusConstants");

exports.successResponse = (
  res,
  statusCode,
  message,
  data = [],
  meta = {}
) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: "success",
    message,
    data,
    meta,
  });
};

exports.errorResponse = (
  res,
  statusCode,
  message,
  description
) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: "error",
    message,
    description,
    data: [],
  });
};