const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../utils/fileUpload");

const {
  createBook,
  updateBook,
  getBooks,
  getBookById,
  deleteBook
} = require("../controllers/bookController");

const { validateCreateBook } = require("../validators/bookCreateValidator");
const { validateUpdateBook } = require("../validators/bookUpdateValidator");

// ✅ CREATE
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("cover_file"),
  validateCreateBook,
  createBook
);

// ✅ UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("cover_file"),
  validateUpdateBook,
  updateBook
);

// ✅ GET
router.get("/", authMiddleware, getBooks);
router.get("/:id", authMiddleware, getBookById);

// ✅ DELETE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteBook
);

module.exports = router;