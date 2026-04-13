/**
 * @module bookValidator
 * @desc Defines validation rules for book-related operations using express-validator.
 *       Includes separate validators for create and update operations.
 *
 * @requires express-validator
 * @requires ../constants/messages
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @constant bookCreateValidator
 * @desc Validation rules for creating a new book
 *
 * @rules
 * - book_title: required, string
 * - author_name: required, string
 * - total_copies: required, integer > 0
 * - status: required, must be ACTIVE or INACTIVE
 */
/**
 * @constant bookUpdateValidator
 * @desc Validation rules for updating an existing book
 *
 * @rules
 * - total_copies: optional, integer > 0
 * - available_copies: optional, integer >= 0
 * - status: optional, must be ACTIVE or INACTIVE
 */


const { body,param } = require("express-validator");
const MESSAGE = require("../constants/messages");


// CREATE VALIDATOR
const bookCreateValidator = [
    // param("book_id")
    // .optional()
    // .bail()
    // .isInt({min:1})
    // .withMessage("dhhsdh"),

  body("book_title")
    .notEmpty()
    .withMessage(MESSAGE.VALIDATION_FAILED + ": Book title is required")
    .bail()
    .isString()
    .withMessage("Book title must be a string")
    .trim(),

  body("author_name")
    .notEmpty()
    .withMessage(MESSAGE.VALIDATION_FAILED + ": Author name is required")
    .bail()
    .isString()
    .withMessage("Author name must be a string")
    .trim(),

  body("total_copies")
    .notEmpty()
    .withMessage(MESSAGE.VALIDATION_FAILED + ": Total copies required")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Total copies must be greater than 0")
    .toInt(),

  body("status")
    .notEmpty()
    .withMessage(MESSAGE.VALIDATION_FAILED + ": Status required")
    .bail()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];

// UPDATE VALIDATOR
const bookUpdateValidator = [

  body("total_copies")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total copies must be greater than 0")
    .toInt(),

  body("available_copies")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Available copies cannot be negative")
    .toInt(),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];

module.exports = {
  bookCreateValidator,
  bookUpdateValidator,
};