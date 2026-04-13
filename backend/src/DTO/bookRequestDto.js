/**
 * @module bookRequestDto
 * @desc Transforms incoming request data into a structured format
 *       suitable for database operations. Handles parsing, trimming,
 *       and conditional field inclusion.
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

/**
 * @function bookRequestDto
 * @desc Converts raw request body into a normalized DTO for create/update operations
 *
 * @param {Object} data - Incoming request body
 * @param {string|number} [data.id] - Book ID (optional, for update)
 * @param {string} [data.book_title] - Book title
 * @param {string} [data.author_name] - Author name
 * @param {string|number} [data.total_copies] - Total copies
 * @param {string|number} [data.available_copies] - Available copies
 * @param {string} [data.status] - Book status
 *
 * @returns {Object} DTO object
 * @returns {number|null} returns.id - Parsed book ID or null (for create)
 * @returns {Object} returns.bookData - Cleaned and formatted book data
 *
 * @throws {Error} If parsing fails
 */

exports.bookRequestDto = (data) => {
  return {
    id: data.id ? parseInt(data.id) : null, 

    bookData: {
      ...(data.book_title && {
        book_title: data.book_title.trim(),
      }),

      ...(data.author_name && {
        author_name: data.author_name.trim(),
      }),

      ...(data.total_copies && {
        total_copies: parseInt(data.total_copies),
      }),

      ...(data.available_copies && {
        available_copies: parseInt(data.available_copies),
      }),

      ...(data.status && {
        status: data.status.toUpperCase(),
      }),
    },
  };
};