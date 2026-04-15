import express from 'express';

const router = express.Router();

import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import upload from '../utils/fileUpload.js';
import validate from '../middlewares/validationMiddleware.js';
import bookValidatorSelector from '../middlewares/bookValidatorSelector.js';

import bookController from '../controllers/bookController.js';

//
const {
  upsertBook,
  getBooks,
  getBookById,
  deleteBook,
} = bookController;


//  UPSERT (CREATE / UPDATE)
router.post(
  '/upsert',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  upload.single('cover_file'),
  bookValidatorSelector,
  validate,
  upsertBook
);


// GET ALL BOOKS
router.get('/', authMiddleware, getBooks);


// GET BOOK BY ID
router.get('/:id', authMiddleware, getBookById);


// DELETE BOOK
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  deleteBook
);


// ✅ ES6 export
export default router;