import { Request, Response } from 'express'
import { verifyToken } from 'helpers'

const handleCheckAuth = async (req: Request, res: Response) => {
  try {
    const token = req.cookies['accessToken']
    if (!token) {
      // no token → not authenticated
      return res.json(null)
    }
    // decode and verify JWT, returns user payload
    const user = verifyToken(token)
    res.json(user)
  } catch {
    // invalid or expired token
    res.json(null)
  }
}

export default handleCheckAuth
