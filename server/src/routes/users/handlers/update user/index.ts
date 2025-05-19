import { SERVER_URL } from 'config'
import { updateUser } from 'database/queries/users'
import { createImage, deleteImage } from 'database/queries/images'
import { Request, Response } from 'express'
import { deleteFiles } from 'helpers'
import bcrypt from 'bcrypt'

const handleUpdateUser = async (req: Request, res: Response) => {
    try {
      // extract incoming user fields from request body
      const user = req.body

      // prepare an object with fields we always update
      const updates: Partial<{ username: string; email: string; password?: string; avatar?: string }> = {
        username: user.username,
        email: user.email
      }

      // if client sent a new password, hash it before saving
      if (user.password) {
        updates.password = await bcrypt.hash(user.password, 10)
      }

      // if a new avatar image was uploaded, handle file save and cleanup
      if (req.file) {
        const file = req.file      
        const fileName = file.filename
        const url = `${SERVER_URL}/images/${fileName}`
        updates.avatar = url;

        // add new avatar record in DB
        await createImage(fileName, file.originalname, url, user.id)

        // remove old avatar record and file if it exists
        if (user.avatar) {
          await deleteImage(user.avatar)
          await deleteFiles(user.avatar)
        }

        // include the new avatar URL in update payload
        updates.avatar = url
      }

      // perform the database update for this user
      await updateUser(user.id, updates)

      // respond with the merged original and updated fields
      res.status(200).json({ ...user, ...updates })
    } catch (error) {
      // on error, send a generic 500 response
      res.status(500).json('An error occurred while updating user')
    }
}

export default handleUpdateUser
