/**
 * @module paginationDto
 * @desc Handles pagination logic by converting query params
 *       into database-friendly pagination format
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */

import { SYSTEM_CONSTANTS } from '../constants/systemConstant';

/**
 * @function paginationDto
 * @desc Converts query parameters into pagination config (skip & take)
 * @access Internal (DTO Layer)
 *
 * @param {Object} query - Request query parameters
 * @param {string|number} [query.page] - Page number (default: 1)
 * @param {string|number} [query.limit] - Items per page (default: 5)
 *
 * @returns {Object} Pagination configuration
 * @returns {number} returns.skip - Number of records to skip
 * @returns {number} returns.take - Number of records to fetch
 * @returns {number} returns.page - Current page number
 * @returns {number} returns.limit - Records per page
 *
 * @throws {Error} If parsing fails
 *
 * @author Ponnarasi
 * @date 2026-04-10
 */
export const paginationDto = query => {
  // Parse page & limit safely with defaults
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || SYSTEM_CONSTANTS.PAGINATION;

  return {
    // Number of records to skip (offset)
    skip: (page - 1) * limit,

    // Number of records to fetch
    take: limit,

    // Current page
    page,

    // Page size
    limit,
  };
};