import API from 'api'

// Request a new JWT refresh token for the given user ID.
// Returns the new token string.
const refreshToken = async (userId: number) => {
  const { data } = await API.post<string>(`/auth/refreshtoken`, { userId })
  return data
}

export default refreshToken