import { Router } from 'express';
import { upload } from 'helpers';
import { authenticate } from 'middleware';
import {
  handleCreateHome,
  handleDeleteHome,
  handleFetchHomes,
  handleUpdateHome,
} from './handlers';

import createComment from 'database/queries/comments/create comment';
import { fetchCommentsByHomeId } from 'database/queries/comments/fetch comments';

const homesRouter = Router();

// Пример GET /homes -> список домов
homesRouter.get('/', handleFetchHomes);

// Пример POST /homes -> создание дома
homesRouter.post('/', authenticate, upload.array('image'), handleCreateHome);

// Пример PATCH /homes -> обновление дома
homesRouter.patch('/', authenticate, upload.array('image'), handleUpdateHome);

// Пример DELETE /homes/:id -> удаление дома
homesRouter.delete('/:id', authenticate, handleDeleteHome);

/**
 * GET /homes/:id/comments -> получить все комментарии к дому
 */
homesRouter.get('/:id/comments', async (req, res) => {
  try {
    const homeId = Number(req.params.id);

    // Должен быть запрос типа:
    // SELECT * FROM comments WHERE home_id = ?
    const comments = await fetchCommentsByHomeId(homeId);

    res.json({ success: true, comments });
  } catch (error) {
    // ...
  }
});


/**
 * POST /homes/:id/comments -> создать комментарий к дому
 */
homesRouter.post('/:id/comments', async (req, res) => {
  try {
    const homeId = Number(req.params.id);
    const { text } = req.body;

    // Если используешь авторизацию, можешь взять userId из req.user.id, иначе ставим заглушку:
    const userId = 1; // Или req.user?.id, если authenticate

    // Сохраняем в БД
    const newCommentId = await createComment({ home_id: homeId, text }, userId);

    // Формируем ответ
    res.json({
      success: true,
      comment: {
        id: newCommentId,
        home_id: homeId,
        user_id: userId,
        text,
        created_at: new Date(),
      },
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, message: 'Error creating comment' });
  }
});

export default homesRouter;
