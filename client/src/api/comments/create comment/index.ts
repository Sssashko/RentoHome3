// src/api/comments/createComment.ts
import API from 'api'
import { Comment } from 'types'

export interface CreateCommentResponse {
  success: boolean
  comment: Comment
}

export const createComment = async (
  homeId: number,
  text: string
): Promise<CreateCommentResponse> => {
  const { data } = await API.post<CreateCommentResponse>(
    `/homes/${homeId}/comments`,
    { text }
  )
  return data
}
