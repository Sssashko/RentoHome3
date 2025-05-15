import API from 'api'
import { Comment } from 'types'

export interface CreateCommentResponse {
  success: boolean
  comment: Comment
}

/**
 * Create a new comment under a specific home.
 * @param homeId  ID of the home to comment on
 * @param text    The comment text
 * @returns       Whether it worked and the new comment object
 */
export const createComment = async (
  homeId: number,
  text: string
): Promise<CreateCommentResponse> => {
  // Send the comment text to the server
  const { data } = await API.post<CreateCommentResponse>(
    `/homes/${homeId}/comments`,
    { text }
  )
  // Return server’s response
  return data
}

export default createComment