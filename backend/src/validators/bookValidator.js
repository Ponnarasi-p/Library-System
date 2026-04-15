import { body } from 'express-validator';
import MESSAGE from '../constants/messages.js';

export const bookCreateValidator = [
  body('book_title')
    .notEmpty()
    .withMessage(MESSAGE.VALIDATION_FAILED + ': Book title is required')
    .bail()
    .isString()
    .withMessage('Book title must be a string')
    .trim(),

  body('author_name')
    .notEmpty()
    .withMessage(MESSAGE.VALIDATION_FAILED + ': Author name is required')
    .bail()
    .isString()
    .withMessage('Author name must be a string')
    .trim(),

  body('total_copies')
    .notEmpty()
    .withMessage(MESSAGE.VALIDATION_FAILED + ': Total copies required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Total copies must be greater than 0')
    .toInt(),

  body('status')
    .notEmpty()
    .withMessage(MESSAGE.VALIDATION_FAILED + ': Status required')
    .bail()
    .isIn(['ACTIVE', 'INACTIVE'])
    .withMessage('Invalid status'),
];

export const bookUpdateValidator = [
  body('total_copies')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Total copies must be greater than 0')
    .toInt(),

  body('available_copies')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Available copies cannot be negative')
    .toInt(),

  body('status')
    .optional()
    .isIn(['ACTIVE', 'INACTIVE'])
    .withMessage('Invalid status'),
];