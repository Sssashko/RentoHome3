import { CLIENT_URL } from 'config';
import { Router } from 'express';
import { upload } from 'helpers';
import { passport } from 'middleware';

import {
	handleCheckAuth,
	handleLogIn,
	handleLogOut,
	handleRefreshToken,
	handleSignUp
} from './handlers';

const authRouter = Router();

authRouter.get('/', handleCheckAuth);

authRouter.post('/login', handleLogIn);
authRouter.post(
	'/signup',
	upload.single('avatar'),
	(req, res, next) => {
		// Validate uploaded file (if needed)
		if (!req.file) {
			return res.status(400).send('Avatar is required');
		}
		const allowedExtensions = ['.jpg', '.jpeg', '.png'];
		const fileExtension = req.file.originalname.split('.').pop()?.toLowerCase();
		if (!allowedExtensions.includes(`.${fileExtension}`)) {
			return res.status(400).send('Invalid file type');
		}
		next();
	},
	handleSignUp
);
authRouter.post('/logout', handleLogOut);

authRouter.post('/refreshtoken', handleRefreshToken);

export default authRouter;
