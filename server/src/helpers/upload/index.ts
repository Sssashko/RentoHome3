import multer from 'multer'
import { extname } from 'path'
import { v4 as uuid } from 'uuid'

// Only allow these image file extensions
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']

// Configure disk storage for uploaded files
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'images/') // save into the local images/ folder
  },
  filename: (_req, file, cb) => {
    const extension = extname(file.originalname).toLowerCase()

    // Reject disallowed file types
    if (!allowedExtensions.includes(extension)) {
      return cb(new Error('Invalid file type'), '')
    }

    // Use a UUID to avoid name collisions, keep original extension
    cb(null, uuid() + extension)
  }
})

// Create the multer middleware with 5MB file size limit
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
})

export default upload
