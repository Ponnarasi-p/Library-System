const ERROR = {
  VALIDATION_FAILED: "validation_failed",
};

exports.validateUpdateBook = (req, res, next) => {
  const data = req.body;

  if (data.total_copies !== undefined && data.total_copies <= 0) {
    return next({
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Total copies must be greater than 0",
    });
  }

  if (data.available_copies !== undefined && data.available_copies < 0) {
    return next({
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Available copies cannot be negative",
    });
  }

  if (
    data.total_copies !== undefined &&
    data.available_copies !== undefined &&
    data.available_copies > data.total_copies
  ) {
    return next({
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Available copies cannot exceed total copies",
    });
  }

  if (
    data.status &&
    !["ACTIVE", "INACTIVE"].includes(data.status.toUpperCase())
  ) {
    return next({
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Invalid status",
    });
  }

  next(); 
};