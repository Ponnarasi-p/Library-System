/**
 * @module fileUpload
 * @desc Configures multer for handling file uploads.
 *       Supports image uploads with validation, storage configuration,
 *       and file size limits.
 *
 * @requires multer
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
/**
 * @constant storage
 * @type {multer.StorageEngine}
 * @desc Defines disk storage configuration for uploaded files
 *       - destination: folder where files are stored
 *       - filename: generates unique file name
 */


/**
 * @function fileFilter
 * @desc Filters uploaded files based on allowed MIME types
 *
 * @param {Object} req - Express request object
 * @param {Object} file - Uploaded file object
 * @param {string} file.mimetype - MIME type of file
 * @param {Function} cb - Callback function
 *
 * @returns {void}
 *
 * @throws {Error} If file type is not allowed
 */

/**
 * @constant upload
 * @type {multer.Instance}
 * @desc Multer instance configured with:
 *       - disk storage
 *       - file size limit (5MB)
 *       - file type validation
 */


const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads/books");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

module.exports = upload;