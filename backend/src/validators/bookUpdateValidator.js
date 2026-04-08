// const ERROR = {
//   VALIDATION_FAILED: "validation_failed",
// };

// exports.validateUpdateBook = (data) => {
//   if (data.total_Copies !== undefined && data.totalCopies <= 0) {
//     throw {
//       status: 400,
//       message: ERROR.VALIDATION_FAILED,
//       description: "Total copies must be greater than 0",
//     };
//   }

//   if (
//     data.availableCopies !== undefined &&
//     data.availableCopies < 0
//   ) {
//     throw {
//       status: 400,
//       message: ERROR.VALIDATION_FAILED,
//       description: "Available copies cannot be negative",
//     };
//   }

//   if (
//     data.total_Copies !== undefined &&
//     data.availableCopies !== undefined &&
//     data.availableCopies > data.totalCopies
//   ) {
//     throw {
//       status: 400,
//       message: ERROR.VALIDATION_FAILED,
//       description: "Available copies cannot exceed total copies",
//     };
//   }

//   if (
//     data.status &&
//     !["ACTIVE", "INACTIVE"].includes(data.status.toUpperCase())
//   ) {
//     throw {
//       status: 400,
//       message: ERROR.VALIDATION_FAILED,
//       description: "Invalid status",
//     };
//   }
// };
const ERROR = {
  VALIDATION_FAILED: "validation_failed",
};

exports.validateUpdateBook = (data) => {
  if (data.total_copies !== undefined && data.total_copies <= 0) {
    throw { status: 400, message: ERROR.VALIDATION_FAILED, description: "Total copies must be greater than 0" };
  }

  if (data.available_copies !== undefined && data.available_copies < 0) {
    throw { status: 400, message: ERROR.VALIDATION_FAILED, description: "Available copies cannot be negative" };
  }

  if (
    data.total_copies !== undefined &&
    data.available_copies !== undefined &&
    data.available_copies > data.total_copies
  ) {
    throw { status: 400, message: ERROR.VALIDATION_FAILED, description: "Available copies cannot exceed total copies" };
  }

  if (
    data.status &&
    !["ACTIVE", "INACTIVE"].includes(data.status.toUpperCase())
  ) {
    throw { status: 400, message: ERROR.VALIDATION_FAILED, description: "Invalid status" };
  }
};