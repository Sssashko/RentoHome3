import { Router } from 'express';
import { upload } from 'helpers';
import authenticate from 'middleware/authenticate';
import { handleUpdateUser } from './handlers';

const usersRouter = Router();

usersRouter.patch('/update', authenticate, upload.single('avatar'), (req, res, next) => {
    console.log('🔥 PATCH /users/update called!');
    next();
}, handleUpdateUser);


export default usersRouter;
