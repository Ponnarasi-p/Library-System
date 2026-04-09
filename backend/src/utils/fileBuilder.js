exports.buildFileData = (file) => {
  if (!file) return null;

  return {
    file_name: file.originalname,
    stored_file_name: file.filename,
    file_path: file.path,
    file_size_kb: file.size / 1024,
    file_type: file.mimetype,
  };
};