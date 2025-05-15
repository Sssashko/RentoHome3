import API from 'api'

/**
 * Remove a comment by its ID.
 * @param commentId  ID of the comment to delete
 * @returns          Server’s success response
 */
const deleteComment = async (commentId: number) => {
  // Tell the server to delete this comment
  const { data } = await API.delete(`/comments/${commentId}`)
  return data
}

export default deleteComment
