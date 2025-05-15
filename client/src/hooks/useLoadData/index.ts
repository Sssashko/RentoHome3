import { checkAuthQuery } from 'api/auth'
import { useCreateProtectedRequest } from 'hooks'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthStore, useHomesStore } from 'store'

import { healthCheck } from './helpers'

const useLoadData = () => {
  // 1) Zustand action to fetch all homes into your store
  const { fetchHomes } = useHomesStore()
  // 2) Zustand action to set the current user object
  const { setUser } = useAuthStore()

  // Local UI state
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  // Wraps any API call in auth+refresh logic
  const createProtectedRequest = useCreateProtectedRequest()

  // Prepare a “fetch current user” function that will:
  //  • check /auth  
  //  • if expired, try to refresh token once  
  //  • if success, then call setUser(response)  
  //  • if failure, do NOT redirect to /login (redirect: false)
  const fetchUser = createProtectedRequest({
    requestQuery: checkAuthQuery,  // calls GET /auth
    callback:    setUser,          // writes user into your store
    redirect:    false             // don’t auto-send to /login on failure
  })

  // The main loader you call from App:
  const loadData = async () => {
    // 1) Only proceed if server is alive
    if (await healthCheck()) {
      try {
        // 2) In parallel: houses + user
        await Promise.all([ fetchHomes(), fetchUser() ])
      } catch {
        // 3) One of them failed unexpectedly
        toast.error('An error occured while fetching data')
      }
    } else {
      // 4) Server is down → show fallback UI
      setError(true)
    }

    // 5) Done loading in all cases
    setLoading(false)
  }

  return { error, loading, loadData }
}

export default useLoadData
