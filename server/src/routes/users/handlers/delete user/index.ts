import { Request, Response } from 'express'
import deleteRefreshTokens from 'database/queries/refresh tokens/delete token'
import deleteUser from 'database/queries/users/delete user'

const handleDeleteUser = async (req: Request, res: Response) => {
    try {
      // parse (analizēt) and validate user ID from URL
      const userId = Number(req.params.id)
      if (!userId || isNaN(userId)) {
        return res.status(400).json('Invalid user ID')
      }

      // first remove any stored refresh tokens for this user
      await deleteRefreshTokens(userId)

      // then delete the user record itself
      await deleteUser(userId)

      // respond that deletion (dzēšana) succeeded
      return res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
      console.error('Error deleting user:', error)
      // on error, send 500
      return res.status(500).json({ message: 'Failed to delete user' })
    }
}

export default handleDeleteUser
