import { CLIENT_URL } from 'config'
import { Router } from 'express'
import { upload } from 'helpers'
import passport from 'middleware/passport'

import {
  handleCheckAuth,
  handleLogIn,
  handleLogOut,
  handleRefreshToken,
  handleSignUp
} from './handlers'

const authRouter = Router()

// Check if the user is already authenticated (returns user info or null)
authRouter.get('/', handleCheckAuth)

// Log in with email+password, set accessToken cookie, store refresh token
authRouter.post('/login', handleLogIn)

// Sign up with optional avatar upload, hash password, create user, issue tokens
authRouter.post(
  '/signup',
  upload.single('avatar'),   
  handleSignUp              
)

// Log out: clear accessToken cookie and delete refresh token from DB
authRouter.post('/logout', handleLogOut)

// Issue a new short-lived access token using stored refresh token
authRouter.post('/refreshtoken', handleRefreshToken)

export default authRouter
