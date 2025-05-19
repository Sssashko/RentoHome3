import { Request, Response } from 'express'
import deleteComment from 'database/queries/comments/delete comment'
import { fetchRelatedImages, deleteRelatedImages } from 'database/queries/images'
import { deleteFiles } from 'helpers'

const handleDeleteComment = async (req: Request, res: Response) => {
  try {
    // parse (analizēt) comment ID from URL
    const commentId = Number(req.params.commentId)

    // get any images linked to this comment
    const images = await fetchRelatedImages(commentId)
    // remove DB records for those images
    await deleteRelatedImages(commentId)
    // delete the comment itself
    await deleteComment(commentId)

    // delete physical image files if any URLs returned
    if (images?.length) {
      await deleteFiles(...images)
    }

    res.status(200).json('Comment has been deleted')
  } catch (error) {
    console.error('Error while deleting comment', error)
    res.status(500).json('Error while deleting comment')
  }
}

export default handleDeleteComment
