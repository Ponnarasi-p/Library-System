/**
 * @module bookRoutes
 * @desc Defines all book-related API routes including create/update,
 *       fetch, and delete operations. Applies authentication,
 *       authorization, validation, and file upload middleware.
 *
 * @requires express
 * @requires ../middlewares/authMiddleware
 * @requires ../middlewares/roleMiddleware
 * @requires ../utils/fileUpload
 * @requires ../middlewares/validationMiddleware
 * @requires ../validators/bookValidator
 * @requires ../controllers/bookController
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
/**
 * @constant router
 * @type {import('express').Router}
 * @desc Express router instance for book routes
 */
/**
 * @route POST /upsert
 * @desc Create a new book or update an existing book
 * @access Protected (ADMIN only)
 *
 * @middleware authMiddleware - Validates JWT token
 * @middleware roleMiddleware(["ADMIN"]) - Restricts access to admin users
 * @middleware upload.single("cover_file") - Handles file upload
 * @middleware bookCreateValidator - Validates request body
 * @middleware validate - Handles validation errors
 */
/**
 * @route GET /
 * @desc Fetch all books with pagination and filters
 * @access Protected
 *
 * @middleware authMiddleware - Validates JWT token
 */

/**
 * @route GET /:id
 * @desc Fetch a single book by ID
 * @access Protected
 *
 * @middleware authMiddleware - Validates JWT token
 */

/**
 * @route DELETE /:id
 * @desc Soft delete a book by ID
 * @access Protected (ADMIN only)
 *
 * @middleware authMiddleware - Validates JWT token
 * @middleware roleMiddleware(["ADMIN"]) - Restricts access to admin users
 */

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../utils/fileUpload");
const validate = require("../middlewares/validationMiddleware");
const {
  bookCreateValidator,
} = require("../validators/bookValidator");

const {
  upsertBook,
  getBooks,
  getBookById,
  deleteBook
} = require("../controllers/bookController");


//  UPSERT (CREATE + UPDATE)

router.post(
  "/upsert",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("cover_file"),

  // APPLY VALIDATORS
 bookCreateValidator,

  validate, 

  upsertBook
);

// GET
router.get("/", authMiddleware, getBooks);
router.get("/:id", authMiddleware, getBookById);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteBook
);

module.exports = router;