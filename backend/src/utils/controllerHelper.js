import HTTP from '../constants/httpStatusConstants.js';
import MESSAGE from '../constants/messages.js';

export const buildUpsertResponse = id => {
  return {
    statusCode: id ? HTTP.OK : HTTP.CREATED,
    message: id
      ? MESSAGE.BOOK_UPDATE_SUCCESS
      : MESSAGE.BOOK_CREATE_SUCCESS,
  };
};