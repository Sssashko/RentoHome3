import { Request, Response } from 'express'
import createComment from 'database/queries/comments/create comment'
import { User } from 'types'

const handleCreateComment = async (req: Request, res: Response) => {
  try {
    // get authenticated user from request (set by authenticate middleware)
    const user = req.user as User
    if (!user?.id) {
      return res.status(401).json({ success: false, message: 'Unauthorized (no user)' })
    }

    // read home_id and text from request body
    const { home_id, text } = req.body
    if (!home_id || !text) {
      return res.status(400).json({ success: false, message: 'Invalid comment data' })
    }

    // insert comment into DB and get new comment ID
    const commentId = await createComment({ home_id, text }, user.id)

    // build comment object to return
    const createdComment = {
      id: commentId,
      home_id,
      text,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      },
      created_at: new Date() // timestamp for client
    }

    return res.status(200).json({ success: true, comment: createdComment })
  } catch (error) {
    console.error('Error while creating comment', error)
    return res.status(500).json({ success: false, message: 'Error while creating comment' })
  }
}

export default handleCreateComment
