/**
 * @module app
 * @desc Main Express application configuration.
 *       Sets up middleware, routes, static file serving,
 *       and global error handling.
 *
 * @requires express
 * @requires cors
 * @requires ./routes/authRoutes
 * @requires ./routes/bookRoutes
 * @requires ./middlewares/errorMiddleware
 * @requires ./middlewares/notFoundMiddleware
 * @requires ./middlewares/loggerMiddleware
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @middleware CORS
 * @desc Enables Cross-Origin Resource Sharing for frontend access
 */
/**
 * @middleware bodyParser
 * @desc Parses incoming JSON and URL-encoded request bodies
 */
/**
 * @middleware loggerMiddleware
 * @desc Logs incoming requests and responses with requestId
 */

/**
 * @route /api/auth
 * @desc Authentication routes (login, etc.)
 */
/**
 * @route /api/books
 * @desc Book management routes (CRUD operations)
 */
/**
 * @middleware staticFiles
 * @desc Serves uploaded files (images/documents) as static resources
 *       Accessible via /uploads/<filename>
 */
/**
 * @middleware notFoundMiddleware
 * @desc Handles undefined routes (404)
 */
/**
 * @middleware errorMiddleware
 * @desc Global error handler for all application errors
 */

const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const loggerMiddleware = require("./middlewares/loggerMiddleware"); 

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));//parses form data

// LOGGER (before routes)
app.use(loggerMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/uploads", express.static("src/uploads"));//serves uploaded images -accessed via url

app.use(notFoundMiddleware);//fallback middleware
app.use(errorMiddleware);//catches all errors

module.exports = app;