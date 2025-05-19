import { JWT_SECRET } from 'config'
import { sign, verify } from 'jsonwebtoken'
import { User } from 'types'

/**
 * Create a short-lived access token (JWT) carrying user info.
 * Expires in 1 hour.
 */
const createAccessToken = (user: User) =>
  sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      password: user.password
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

/**
 * Create a longer-lived refresh token (JWT).
 * Expires in 24 hours.
 */
const createRefreshToken = (user: User) =>
  sign(user, JWT_SECRET, { expiresIn: '24h' })

/**
 * Verify a JWT and extract the embedded user data.
 * Throws if the token is invalid or expired.
 */
const verifyToken = (token: string) => {
  try {
    const decoded = verify(token, JWT_SECRET) as User
    console.log('Decoded User:', decoded) // debug: show user payload
    // Return only the fields we need downstream
    const { id, username, email, avatar, password } = decoded
    return { id, username, email, avatar, password }
  } catch (err) {
    console.error('Invalid token:', err)
    throw new Error('Invalid token')
  }
}

export { createAccessToken, createRefreshToken, verifyToken }
