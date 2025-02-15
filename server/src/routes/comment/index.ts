import { Router } from 'express';
import { authenticate } from 'middleware'; // если надо
import { upload } from 'helpers';         // если надо
import {
  handleCreateComment,
  // handleUpdateComment,
  // handleDeleteComment
} from './handlers';

import { fetchCommentsByHomeId } from '../comment/handlers/fetch comments';

const commentsRouter = Router();

// GET /comments -> например, список всех комментариев (если нужно)
commentsRouter.get('/', fetchCommentsByHomeId);

// POST /comments -> создать комментарий
commentsRouter.post('/', authenticate, upload.array('image'), handleCreateComment);

// Если нужны patch/delete:
// commentsRouter.patch('/:id', authenticate, upload.array('image'), handleUpdateComment);
// commentsRouter.delete('/:id', authenticate, handleDeleteComment);

export default commentsRouter;
