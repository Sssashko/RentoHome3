import { Request, Response } from 'express'
import deleteComment from 'database/queries/comments/delete comment'
import { fetchRelatedImages, deleteRelatedImages } from 'database/queries/images'
import { deleteFiles } from 'helpers'

const handleDeleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = Number(req.params.commentId)

    const images = await fetchRelatedImages(commentId)
    await deleteRelatedImages(commentId)
    await deleteComment(commentId)

    if (images && images.length) {
      await deleteFiles(...images)
    }

    res.status(200).json('Comment has been deleted')
  } catch (error) {
    console.log('Error while deleting comment', error)
    res.status(500).json('Error while deleting comment')
  }
}

export default handleDeleteComment
