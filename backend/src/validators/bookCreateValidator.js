const ERROR = {
  VALIDATION_FAILED: "validation_failed",
};

exports.validateCreateBook = (data) => {
  if (!data.book_title || data.book_title.trim() === "") {
    throw {
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Book title is required",
    };
  }

  if (!data.author_name || data.author_name.trim() === "") {
    throw {
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Author name is required",
    };
  }

  if (!data.total_copies || data.total_copies <= 0) {
    throw {
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Total copies must be greater than 0",
    };
  }

  if (!["ACTIVE", "INACTIVE"].includes(data.status)) {
    throw {
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Invalid status",
    };
  }
};