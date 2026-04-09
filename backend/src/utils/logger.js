const { createLogger, format, transports } = require("winston");
const path = require("path");

const logDir = path.join(__dirname, "../../logs");

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",

  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json()
  ),

  transports: [
    new transports.Console(),

    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),

    new transports.File({
      filename: path.join(logDir, "combined.log"),
    }),
  ],
});

module.exports = logger;