import API from 'api'
import { Comment } from 'types'

/**
 * Load all comments for one home.
 * @param homeId  ID of the home
 * @returns       List of comments
 */
const fetchComments = async (homeId: number): Promise<Comment[]> => {
  // Ask server for the comments array
  const { data } = await API.get<Comment[]>(`/homes/${homeId}/comments`)
  return data
}

export default fetchComments
