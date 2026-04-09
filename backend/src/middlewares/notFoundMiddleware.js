const logger = require("../utils/logger");

module.exports = (req, res, next) => {
  logger.warn(`404 | ${req.method} ${req.originalUrl}`);

  res.status(404).json({
    success: false,
    message: "Route not found"
  });
};