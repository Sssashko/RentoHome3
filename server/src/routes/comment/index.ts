import { Router } from 'express'
import { authenticate } from 'middleware'
import handleCreateComment from './handlers/create comment'
import handleDeleteComment from './handlers/delete comment'
import { fetchCommentsByHomeId } from './handlers/fetch comments'

const commentsRouter = Router()

// GET /:homeId  → list comments for given home
commentsRouter.get('/:homeId', fetchCommentsByHomeId)

// POST /:homeId → add new comment (requires auth)
commentsRouter.post('/:homeId', authenticate, handleCreateComment)

// DELETE /:commentId → delete comment by ID (requires auth)
commentsRouter.delete('/:commentId', authenticate, handleDeleteComment)

export default commentsRouter
