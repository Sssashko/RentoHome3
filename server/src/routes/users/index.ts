import { Router } from 'express'
import { upload } from 'helpers'
import authenticate from 'middleware/authenticate'
import { handleDeleteUser, handleUpdateUser, handleGetUserLikes } from './handlers'

const usersRouter = Router()

// update profile (requires auth, file upload)
usersRouter.patch(
  '/update',
  authenticate,              // ensure user is logged in
  upload.single('avatar'),   // accept single file under field "avatar"
  (req, res, next) => {      // debug middleware
    next()
  },
  handleUpdateUser
)

// delete a user account (requires auth)
usersRouter.delete(
  '/:id',
  authenticate,
  handleDeleteUser
)

// get list of homes liked by user (requires auth)
usersRouter.get(
  '/:id/likes',
  authenticate,
  handleGetUserLikes
)

export default usersRouter
