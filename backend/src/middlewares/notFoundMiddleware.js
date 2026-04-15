import { SYSTEM_CONSTANTS } from '../constants/systemConstant.js';
import logger from '../utils/logger.js';

const notFoundMiddleware = (req, res, next) => {
  logger.warn({
    message: 'ROUTE_NOT_FOUND',
    method: req.method,
    url: req.originalUrl,
    type: 'REQUEST',
  });

  return res.status(SYSTEM_CONSTANTS.NOT_FOUND_ERROR).json({
    code: SYSTEM_CONSTANTS.NOT_FOUND_ERROR,
    status: 'error',
    message: 'Route not found',
    description: `Cannot ${req.method} ${req.originalUrl}`,
    data: [],
  });
};

export default notFoundMiddleware;