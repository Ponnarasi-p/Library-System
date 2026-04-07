const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../utils/fileUpload");

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  upload.single("cover_file"), // 👈 ADD THIS
  createBook
);
router.get("/", authMiddleware, getBooks);
router.get("/:id", authMiddleware, getBookById);
router.put("/:id", authMiddleware, roleMiddleware(["ADMIN"]), updateBook);
router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), deleteBook);

module.exports = router;