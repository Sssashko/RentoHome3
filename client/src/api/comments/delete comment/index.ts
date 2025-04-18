import API from 'api'

const deleteComment = async (commentId: number) => {
  const { data } = await API.delete(`/comments/${commentId}`, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data
}

export default deleteComment
