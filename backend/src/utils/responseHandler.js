

export const successResponse = (
  res,
  statusCode,
  message,
  data = [],
  meta = {}
) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: 'success',
    message,
    data,
    meta,
  });
};

export const errorResponse = (
  res,
  statusCode,
  message,
  description
) => {
  return res.status(statusCode).json({
    code: statusCode,
    status: 'error',
    message,
    description,
    data: [],
  });
};