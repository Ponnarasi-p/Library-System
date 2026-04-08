const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../utils/fileUpload");

const {
  upsertBook,
  getBooks,
  getBookById,
  deleteBook,
} = require("../controllers/bookController");

// CREATE
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("cover_file"),
  upsertBook
);

// GET ALL
router.get("/", authMiddleware, getBooks);

// GET BY ID
router.get("/:id", authMiddleware, getBookById);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("cover_file"),
  upsertBook
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  deleteBook
);

module.exports = router;