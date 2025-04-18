// В файле usersRouter (например, server/src/routes/users/index.ts)
import { Router } from 'express';
import { upload } from 'helpers';
import authenticate from 'middleware/authenticate';
import { handleDeleteUser, handleUpdateUser, handleGetUserLikes } from './handlers';

const usersRouter = Router();

// Обновление пользователя
usersRouter.patch('/update', authenticate, upload.single('avatar'), (req, res, next) => {
    console.log('🔥 PATCH /users/update called!');
    next();
}, handleUpdateUser);

// Удаление пользователя
usersRouter.delete('/:id', authenticate, handleDeleteUser);

// Добавляем маршрут для получения лайков пользователя:
usersRouter.get('/:id/likes', authenticate, handleGetUserLikes);

export default usersRouter;
