const HTTP = require("../constants/httpStatusConstants");

exports.successResponse = (
  res,
  statusCode,
  message,
  description,
  data = []
) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: "success",
    message,
    description,
    data,
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