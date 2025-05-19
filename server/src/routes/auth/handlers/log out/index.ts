import { deleteRefreshToken } from 'database/queries/refresh tokens'
import { Request, Response } from 'express'

const handleLogOut = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId as number
    // clear the access token cookie
    res.clearCookie('accessToken')
    // remove refresh token from database
    await deleteRefreshToken(userId)
    res.json()
  } catch (error) {
    console.error('Error while logging out', error)
    res.status(500).json('Error while logging out')
  }
}

export default handleLogOut
