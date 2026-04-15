import multer from 'multer';
import { SYSTEM_CONSTANTS } from '../constants/systemConstant.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/books');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];

  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }

  return cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: SYSTEM_CONSTANTS.PAGINATION * SYSTEM_CONSTANTS.BYTE * SYSTEM_CONSTANTS.BYTE },
  fileFilter,
});

export default upload;