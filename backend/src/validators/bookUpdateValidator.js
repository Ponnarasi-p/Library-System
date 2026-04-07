const ERROR = {
  VALIDATION_FAILED: "validation_failed",
};

exports.validateUpdateBook = (data) => {
  if (data.totalCopies !== undefined && data.totalCopies <= 0) {
    throw {
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Total copies must be greater than 0",
    };
  }

  if (
    data.availableCopies !== undefined &&
    data.availableCopies < 0
  ) {
    throw {
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Available copies cannot be negative",
    };
  }

  if (
    data.totalCopies !== undefined &&
    data.availableCopies !== undefined &&
    data.availableCopies > data.totalCopies
  ) {
    throw {
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Available copies cannot exceed total copies",
    };
  }

  if (
    data.status &&
    !["ACTIVE", "INACTIVE"].includes(data.status.toUpperCase())
  ) {
    throw {
      status: 400,
      message: ERROR.VALIDATION_FAILED,
      description: "Invalid status",
    };
  }
};