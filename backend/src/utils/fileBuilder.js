/**
 * @module fileBuilder
 * @desc Utility to transform uploaded file object into a structured format
 *       suitable for database storage.
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @function buildFileData
 * @desc Converts raw file object (from multer) into a normalized file data object
 *
 * @param {Object} file - Uploaded file object (from multer)
 * @param {string} file.originalname - Original file name
 * @param {string} file.filename - Stored file name on server
 * @param {string} file.path - File storage path
 * @param {number} file.size - File size in bytes
 * @param {string} file.mimetype - File MIME type
 *
 * @returns {Object|null} File data object or null if no file provided
 * @returns {string} returns.file_name - Original file name
 * @returns {string} returns.stored_file_name - Stored file name
 * @returns {string} returns.file_path - File path
 * @returns {number} returns.file_size_kb - File size in KB
 * @returns {string} returns.file_type - File MIME type
 *
 * @throws {Error} If file processing fails
 */

exports.buildFileData = (file) => {
  if (!file) return null;

  return {
    file_name: file.originalname,
    stored_file_name: file.filename,
    file_path: file.path,
    file_size_kb: file.size / 1024,
    file_type: file.mimetype,
  };
};