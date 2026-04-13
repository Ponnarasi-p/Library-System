/**
 * @module logger
 * @desc Configures and exports a centralized Winston logger instance.
 *       Supports console and file logging with structured JSON format,
 *       timestamps, and error stack traces.
 *
 * @requires winston
 * @requires path
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
/**
 * @constant logDir
 * @type {string}
 * @desc Directory path where log files are stored
 */
/**
 * @constant logger
 * @type {import('winston').Logger}
 * @desc Winston logger instance configured with:
 *       - log level from environment (default: info)
 *       - JSON format with timestamp and error stack
 *       - multiple transports (console + file)
 */


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