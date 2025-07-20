import multer from 'multer';

export const imageUploader = () => {
  // Use memory storage to get file buffer
  const storage = multer.memoryStorage();

  // Return multer instance
  return multer({ storage });
};
