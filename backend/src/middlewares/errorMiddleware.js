// const { errorResponse } = require("../utils/responseHandler");
// const HTTP = require("../constants/httpStatusConstants");

// module.exports = (err, req, res, next) => {
//   console.error(err);

//   return errorResponse(
//     res,
//     err.status || HTTP.INTERNAL_SERVER_ERROR,
//     err.message || "internal_server_error",
//     err.description || "Something went wrong"
//   );
// };

// module.exports = (err, req, res, next) => {
//   console.error("ERROR:", err); // already there

//   return res.status(err.status || 500).json({
//     message: err.message,
//     description: err.description,
//     stack: err.stack, // 👈 ADD THIS TEMPORARILY
//   });
// };

const HTTP = require("../constants/httpStatusConstants");
const MESSAGE = require("../constants/messages");

module.exports = (err, req, res, next) => {
  console.error("ERROR:", err);

  return res.status(err.status || HTTP.INTERNAL_SERVER_ERROR).json({
    code: err.status || HTTP.INTERNAL_SERVER_ERROR,
    status: MESSAGE.ERROR,
    message: err.message || MESSAGE.INTERNAL_ERROR,
    description: err.description || "Something went wrong",
    data: [],
  });
};