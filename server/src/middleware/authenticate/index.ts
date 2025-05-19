import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../../helpers/jwt'
import { User } from '../../types'

// Extend Express Request type to include `user` property
declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

/**
 * Middleware to protect routes by verifying JWT from cookies.
 * - Reads 'accessToken' cookie
 * - Verifies signature and expiration
 * - Attaches decoded user payload to req.user
 * - Rejects with 401 if no token or token is invalid
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['accessToken']            // get JWT from cookie
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' })
    }

    const user = verifyToken(token) as User            // decode & verify token
    if (!user || !user.id) {
      return res.status(401).json({ message: 'Invalid authentication token' })
    }

    req.user = user                                     // make user available downstream
    next()                                              // proceed to next handler
  } catch (error) {
    console.error('Error while authenticating:', error)
    res.status(401).json({ message: 'Invalid authentication token' })
  }
}

export default authenticate
