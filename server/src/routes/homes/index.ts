import { Router } from 'express';
import { upload } from 'helpers';
import { authenticate } from 'middleware';
import {
  handleCreateHome,
  handleDeleteHome,
  handleFetchHomes,
  handleUpdateHome,
  handleLike
} from './handlers';
import createComment from 'database/queries/comments/create comment';
import { fetchCommentsByHomeId } from 'database/queries/comments/fetch comments';
import  handleFetchLikes  from 'database/queries/homes/fetch likes';

const homesRouter = Router();

// GET /homes – список домов
homesRouter.get('/', handleFetchHomes);

// POST /homes – создание дома
homesRouter.post('/', authenticate, upload.array('image'), handleCreateHome);

// PATCH /homes – обновление дома
homesRouter.patch('/', authenticate, upload.array('image'), handleUpdateHome);

// DELETE /homes/:id – удаление дома
homesRouter.delete('/:id', authenticate, handleDeleteHome);

// PATCH /homes/:id/like – переключить лайк для дома (toggle like)
homesRouter.patch('/:id/like', authenticate, handleLike);

// GET /homes/:id/likes – получение лайков для конкретного дома
homesRouter.get('/:id/likes', async (req, res) => {
  try {
    const homeId = Number(req.params.id);
    const likes = await handleFetchLikes(homeId);
    res.json({ success: true, likes });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ success: false, message: 'Error fetching likes' });
  }
});

// GET /homes/:id/comments – получение комментариев для дома
homesRouter.get('/:id/comments', async (req, res) => {
  try {
    const homeId = Number(req.params.id);
    const comments = await fetchCommentsByHomeId(homeId);
    res.json({ success: true, comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ success: false, message: 'Error fetching comments' });
  }
});

// POST /homes/:id/comments – создание комментария для дома
homesRouter.post('/:id/comments', async (req, res) => {
  try {
    const homeId = Number(req.params.id);
    const { text } = req.body;
    // Если используете авторизацию, получите userId из req.user, иначе ставьте заглушку
    const userId = 1; // Или req.user?.id, если authenticate применяется
    const newCommentId = await createComment({ home_id: homeId, text }, userId);
    res.json({
      success: true,
      comment: {
        id: newCommentId,
        home_id: homeId,
        user_id: userId,
        text,
        created_at: new Date()
      }
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ success: false, message: 'Error creating comment' });
  }
});

export default homesRouter;
