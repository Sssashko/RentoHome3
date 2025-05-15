// a hook to wrap any API call so it only runs if the user is still authenticated,
// and automatically tries to refresh the token if needed
import { checkAuthQuery, refreshTokenQuery } from 'api/auth'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store'

type ProtectedRequestOptions<T> = {
  // if false, don’t redirect to /login on failure
  redirect?: boolean
  // the API call you actually want to perform
  requestQuery: () => Promise<T>
  // what to do with the response
  callback: (response: T) => void
}

const useCreateProtectedRequest = () => {
  const { user, logOut } = useAuthStore()
  const navigate = useNavigate()

  const createProtectedRequest = <T>({
    redirect = true,
    requestQuery,
    callback
  }: ProtectedRequestOptions<T>) => {
    // this function runs when you actually want to perform the protected call
    const protectedRequest = async () => {
      let isAuthenticated = false

      try {
        // first, check if current session is valid
        isAuthenticated = !!(await checkAuthQuery())
      } catch {
        // if that fails, try refreshing token once (if we have a user)
        try {
          if (user) {
            await refreshTokenQuery(user.id)
            // then check auth again
            isAuthenticated = !!(await checkAuthQuery())
          }
        } catch {
          // if refresh also fails, log out and optionally redirect
          logOut()
          if (redirect) navigate('/login')
        }
      }

      if (isAuthenticated) {
        // if we’re good, run the real request and hand off the data
        const response = await requestQuery()
        callback(response)
      } else {
        // otherwise, log out and optionally redirect
        logOut()
        if (redirect) navigate('/login')
      }
    }

    return protectedRequest
  }

  return createProtectedRequest
}

export default useCreateProtectedRequest
