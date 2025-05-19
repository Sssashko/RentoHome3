import { compare } from 'bcrypt'
import { storeRefreshToken } from 'database/queries/refresh tokens'
import { fetchUserByEmail } from 'database/queries/users'
import { Request, Response } from 'express'
import { createAccessToken, createRefreshToken } from 'helpers/jwt'

const handleLogIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await fetchUserByEmail(email)

    // check user exists and password matches
    if (user && await compare(password, user.password)) {
      const accessToken = createAccessToken(user)
      const refreshToken = createRefreshToken(user)

      // set secure, httpOnly cookie with access token
      res.cookie('accessToken', accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true
      })
      // save refresh token in database
      await storeRefreshToken(refreshToken, user.id)

      return res.status(200).json(user)
    }

    // wrong email or password
    res.status(401).json('Wrong credentials!')
  } catch (error) {
    console.error('Error while logging in', error)
    res.status(500).json('Error while logging in')
  }
}

export default handleLogIn
