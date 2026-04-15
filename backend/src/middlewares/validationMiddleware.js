import { validationResult } from 'express-validator';
import HTTP from '../constants/httpStatusConstants.js';
import MESSAGE from '../constants/messages.js';

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorList = errors.array();

    return next({
      status: HTTP.BAD_REQUEST,
      message: MESSAGE.VALIDATION_FAILED,
      description: errorList[0].msg,
      errors: errorList,
    });
  }

  return next();
};

export default validate;