import HTTP from '../constants/httpStatusConstants.js';
import MESSAGE from '../constants/messages.js';
import logger from '../utils/logger.js';

const errorMiddleware = (err, req, res) => {
  const statusCode = err.status || HTTP.INTERNAL_SERVER_ERROR;

  logger.error({
    message: err.message,
    description: err.description,
    url: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  return res.status(statusCode).json({
    code: statusCode,
    status: 'error',
    message: err.message || MESSAGE.INTERNAL_ERROR,
    description: err.description || 'Something went wrong',
    data: [],
  });
};

export default errorMiddleware;