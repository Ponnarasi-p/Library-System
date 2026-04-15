import {
  bookCreateValidator,
  bookUpdateValidator,
} from '../validators/bookValidator.js';

const bookValidatorSelector = async (req, res, next) => {
  try {
    const validators = req.body.id
      ? bookUpdateValidator
      : bookCreateValidator;

    await Promise.all(validators.map(validator => validator.run(req)));

    next();
  } catch (error) {
    next(error);
  }
};

export default bookValidatorSelector;