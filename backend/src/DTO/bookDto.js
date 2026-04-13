/**
 * @module bookResponseDto
 * @desc Transforms raw database book records into API response format.
 *       Handles field mapping and constructs accessible file URLs.
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */


/**
 * @function bookResponseDto
 * @desc Converts a single book database object into a structured API response
 *
 * @param {Object} book - Raw book object from database (including documents)
 * @param {number} book.book_id - Book ID
 * @param {string} book.book_title - Book title
 * @param {string} book.author_name - Author name
 * @param {number} book.total_copies - Total copies available
 * @param {number} book.available_copies - Available copies
 * @param {string} book.status - Book status
 * @param {Array} [book.documents] - Associated document records
 *
 * @returns {Object} Formatted book response object
 * @returns {number} returns.id - Book ID
 * @returns {string} returns.title - Book title
 * @returns {string} returns.author - Author name
 * @returns {number} returns.totalCopies - Total copies
 * @returns {number} returns.availableCopies - Available copies
 * @returns {string} returns.status - Book status
 * @returns {string|null} returns.coverUrl - Public URL of book cover (if exists)
 *
 * @throws {Error} If transformation fails
 */
/**
 * @function bookListDto
 * @desc Converts an array of book records into API response format
 *
 * @param {Array<Object>} books - Array of book objects from database
 *
 * @returns {Array<Object>} Array of formatted book response objects
 *
 * @throws {Error} If mapping fails
 */



const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

exports.bookResponseDto = (book) => {
  return {
    id: book.book_id,
    title: book.book_title,
    author: book.author_name,
    totalCopies: book.total_copies,
    availableCopies: book.available_copies,
    status: book.status,

    coverUrl:
      book.documents && book.documents.length > 0
        ? `${BASE_URL}/${book.documents[0].file_path
            .replace("src\\", "")
            .replace(/\\/g, "/")}`
        : null,
  };
};

exports.bookListDto = (books) => {
  return books.map((book) => exports.bookResponseDto(book));
};