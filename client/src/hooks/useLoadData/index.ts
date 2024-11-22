import { checkAuthQuery } from 'api/auth'
import { useCreateProtectedRequest } from 'hooks'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthStore, useHomesStore } from 'store'

import { healthCheck } from './helpers'

const useLoadData = () => {
	const { fetchHomes } = useHomesStore()
	const { setUser } = useAuthStore()

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const createProtectedRequest = useCreateProtectedRequest()

	const fetchUser = createProtectedRequest({
		requestQuery: checkAuthQuery,
		callback: setUser,
		redirect: false
	})

	const loadData = async () => {
		if (await healthCheck()) {
			try {
				await Promise.all([fetchHomes(), fetchUser()])
			} catch (error) {
				toast.error('An error occured while fetching data')
			}
		} else {
			setError(true)
		}
		setLoading(false)
	}

	return { error, loading, loadData }
}

export default useLoadData
