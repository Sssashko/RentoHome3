import { Router } from 'express'
import { upload } from 'helpers'
import { authenticate } from 'middleware'
import {
  handleCreateHome,
  handleDeleteHome,
  handleFetchHomes,
  handleUpdateHome,
  handleLike
} from './handlers'
import createComment from 'database/queries/comments/create comment'
import { fetchCommentsByHomeId } from 'database/queries/comments/fetch comments'
import handleFetchLikes from 'database/queries/homes/fetch likes'

const homesRouter = Router()

// GET /homes – return list of all homes
homesRouter.get('/', handleFetchHomes)

// POST /homes – create a new home (requires auth and image upload)
homesRouter.post(
  '/',
  authenticate,            // check user is logged in
  upload.array('image'),   // accept multiple files under field "image"
  handleCreateHome
)

// PATCH /homes – update an existing home (requires auth and image upload)
homesRouter.patch(
  '/',
  authenticate,
  upload.array('image'),
  handleUpdateHome
)

// DELETE /homes/:id – delete a home by its ID (requires auth)
homesRouter.delete(
  '/:id',
  authenticate,
  handleDeleteHome
)

// PATCH /homes/:id/like – toggle like/unlike for a home (requires auth)
homesRouter.patch(
  '/:id/like',
  authenticate,
  handleLike
)

// GET /homes/:id/likes – fetch all likes for a specific home
homesRouter.get('/:id/likes', async (req, res) => {
  try {
    const homeId = Number(req.params.id)           // parse home ID
    const likes = await handleFetchLikes(homeId)   // get likes array
    res.json({ success: true, likes })
  } catch (error) {
    console.error('Error fetching likes:', error)
    res.status(500).json({ success: false, message: 'Error fetching likes' })
  }
})

// GET /homes/:id/comments – fetch all comments for a specific home
homesRouter.get('/:id/comments', async (req, res) => {
  try {
    const homeId = Number(req.params.id)              // parse home ID
    const comments = await fetchCommentsByHomeId(homeId)
    res.json({ success: true, comments })
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).json({ success: false, message: 'Error fetching comments' })
  }
})

// POST /homes/:id/comments – add a comment to a home
homesRouter.post('/:id/comments', async (req, res) => {
  try {
    const homeId = Number(req.params.id)              // parse home ID
    const { text } = req.body                         // comment text
    const userId = 27 // placeholder or use req.user?.id if auth applied

    const newCommentId = await createComment(
      { home_id: homeId, text },
      userId
    )

    // return the newly created comment object
    res.json({
      success: true,
      comment: {
        id: newCommentId,
        home_id: homeId,
        user_id: userId,
        text,
        created_at: new Date()
      }
    })
  } catch (error) {
    console.error('Error creating comment:', error)
    res.status(500).json({ success: false, message: 'Error creating comment' })
  }
})

export default homesRouter
