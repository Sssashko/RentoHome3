import API from 'api'

export interface UserLikesResponse {
  success: boolean
  likes: number[]  // ids of homes user liked
}

const fetchUserLikes = async (userId: number): Promise<UserLikesResponse> => {
  // get liked home ids for this user
  const { data } = await API.get<UserLikesResponse>(`/users/${userId}/likes`)
  return data
}

export default fetchUserLikes