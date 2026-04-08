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