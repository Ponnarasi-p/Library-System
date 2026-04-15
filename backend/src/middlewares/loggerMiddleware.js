import { v4 as uuidv4 } from 'uuid';
import logger from '../utils/logger.js';

const loggerMiddleware = (err,req, res, next) => {
  const requestId = uuidv4();
  req.requestId = requestId;

  const startTime = Date.now();

  logger.info({
    requestId,
    message: 'REQUEST_START',
    method: req.method,
    url: req.originalUrl,
    type: 'REQUEST',
  });

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    logger.info({
      requestId,
      message: 'REQUEST_COMPLETED',
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      type: 'REQUEST',
    });
  });

  next();
};

export default loggerMiddleware;