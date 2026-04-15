import { SYSTEM_CONSTANTS } from '../constants/systemConstant.js';

export const buildFileData = file => {
  if (!file) return null;

  return {
    file_name: file.originalname,
    stored_file_name: file.filename,
    file_path: file.path,
    file_size_kb: file.size / SYSTEM_CONSTANTS.BYTE,
    file_type: file.mimetype,
  };
};