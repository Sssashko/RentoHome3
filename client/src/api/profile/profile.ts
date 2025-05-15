import API from 'api'
import { User } from 'types'

const updateProfile = async (body: FormData) => {
  // try to send the updated profile to the server
  try {
    // send PATCH request with form data and auth header
    const { data } = await API.patch<User>('/users/update', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      withCredentials: true
    })

    // return the updated user info
    return data
  } catch (err) {
    // log error for debugging
    console.error('Error updating profile:', err)
    throw err  // re-throw so caller can handle it
  }
}

export default updateProfile
