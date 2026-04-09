// const MESSAGE = require("../constants/messages");

// exports.validateCreateBook = (data) => {
//   if (!data.book_title?.trim()) throw err("Book title required");
//   if (!data.author_name?.trim()) throw err("Author name required");
//   if (!data.total_copies || data.total_copies <= 0)
//     throw err("Total copies must be > 0");
//   if (!data.status || !["ACTIVE", "INACTIVE"].includes(data.status))
//     throw err("Invalid status");
// };

// exports.validateUpdateBook = (data) => {
//   if (data.total_copies !== undefined && data.total_copies <= 0)
//     throw err("Total copies must be > 0");
// };

// function err(desc) {
//   return {
//     status: 400,
//     message: MESSAGE.VALIDATION_FAILED,
//     description: desc,
//   };
// }

const ERROR = {
  VALIDATION_FAILED: "validation_failed",
};

exports.validateCreateBook = (req, res, next) => {
  const data = req.body;

  if (!data.book_title || data.book_title.trim() === "") {
    return next({
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Book title is required",
    });
  }

  if (!data.author_name || data.author_name.trim() === "") {
    return next({
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Author name is required",
    });
  }

  if (!data.total_copies || data.total_copies <= 0) {
    return next({
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Total copies must be greater than 0",
    });
  }

  if (!["ACTIVE", "INACTIVE"].includes(data.status)) {
    return next({
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Invalid status",
    });
  }

  next(); 
};