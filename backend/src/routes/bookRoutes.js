const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../utils/fileUpload");

const {
  upsertBook,
  getBooks,
  getBookById,
  deleteBook
} = require("../controllers/bookController");

const { validateCreateBook } = require("../validators/bookCreateValidator");
const { validateUpdateBook } = require("../validators/bookUpdateValidator");

//  UPSERT (CREATE + UPDATE)
router.post(
  "/upsert",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("cover_file"),
  (req, res, next) => {
    if (req.body.id) {
      return validateUpdateBook(req, res, next);
    }
    return validateCreateBook(req, res, next);
  },
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