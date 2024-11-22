import multer from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

// Allowed file extensions
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

const storage = multer.diskStorage({
	destination: function (req, file, callBack) {
		callBack(null, 'images/');
	},
	filename: function (req, file, callBack) {
		const extension = extname(file.originalname).toLowerCase();
		
		if (!allowedExtensions.includes(extension)) {
			return callBack(new Error('Invalid file type'), '');
		}

		callBack(null, uuid() + extension);
	}
});

const upload = multer({ 
	storage,
	limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload;
