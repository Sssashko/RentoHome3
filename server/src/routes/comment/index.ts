import { Router } from 'express';
import { authenticate } from 'middleware';
import handleCreateComment from './handlers/create comment';
import handleDeleteComment from './handlers/delete comment';
import { fetchCommentsByHomeId } from './handlers/fetch comments';

const commentsRouter = Router();

commentsRouter.get('/:homeId', fetchCommentsByHomeId);
commentsRouter.post('/:homeId', authenticate, handleCreateComment);
commentsRouter.delete('/:commentId', authenticate, handleDeleteComment);

export default commentsRouter;
