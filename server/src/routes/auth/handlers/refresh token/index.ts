import getRefreshToken from 'database/queries/refresh tokens/get token'
import { Request, Response } from 'express'
import { createAccessToken, verifyToken } from 'helpers/jwt'

const handleRefreshToken = async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId as number
    // fetch stored refresh token
    const stored = await getRefreshToken(userId)
    if (!stored) {
      // no token found → unauthorized
      return res.status(401).json('No refresh token found')
    }
    // verify and decode refresh token
    const user = verifyToken(stored)
    // issue new access token
    const accessToken = createAccessToken(user)
    res.cookie('accessToken', accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      httpOnly: true
    })
    res.json()
  } catch (error) {
    console.error('Error while refreshing tokens', error)
    res.status(401).json('Error while refreshing tokens')
  }
}

export default handleRefreshToken
