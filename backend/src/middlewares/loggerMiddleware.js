const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger");

module.exports = (req, res, next) => {
  const requestId = uuidv4();
  req.requestId = requestId;

  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info({
      requestId,
      message: "REQUEST_COMPLETED",
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      type: "REQUEST",
    });
  });

  logger.info({
    requestId,
    message: "REQUEST_START",
    method: req.method,
    url: req.originalUrl,
    type: "REQUEST",
  });

  next();
};