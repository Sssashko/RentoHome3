import { useEffect, useState } from 'react'  
import API from 'api'                         
import { User, Home } from 'types'

/**
 * Custom hook for admin data:
 * - Fetches all users and all homes when mounted
 * - Provides functions to delete users and homes, and update users
 */
export function useAdminData() {
  // State for storing users and homes
  const [users, setUsers] = useState<User[]>([])
  const [homes, setHomes] = useState<Home[]>([])

  // Load users and homes on initial render
  useEffect(() => {
    // Fetch all users from backend
    API.get<User[]>('/api/admin/users')
      .then(response => setUsers(response.data))
      .catch(err => console.error('Failed to fetch users', err))

    // Fetch all homes from backend
    API.get<Home[]>('/api/admin/homes')
      .then(response => setHomes(response.data))
      .catch(err => console.error('Failed to fetch homes', err))
  }, [])

  /**
   * Delete a user by ID on backend, then update local state
   * @param id - ID of the user to delete
   */
  const deleteUser = async (id: number) => {
    try {
      await API.delete(`/api/admin/users/${id}`)
      // Remove deleted user from state
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch (err) {
      console.error('Failed to delete user', err)
      throw err
    }
  }

  /**
   * Delete a home by ID on backend, then update local state
   * @param id - ID of the home to delete
   */
  const deleteHome = async (id: number) => {
    try {
      await API.delete(`/api/admin/homes/${id}`)
      // Remove deleted home from state
      setHomes(prev => prev.filter(h => h.id !== id))
    } catch (err) {
      console.error('Failed to delete home', err)
      throw err
    }
  }

  /**
   * Update a user on backend, then merge updated data into state
   * @param id - ID of the user to update
   * @param data - Partial user fields to update
   */
  const updateUser = async (id: number, data: Partial<User>) => {
    const { data: updated } = await API.patch<User>(`/api/admin/users/${id}`, data)
    // Merge updated user into local state array
    setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updated } : u)))
  }

  return { users, homes, deleteUser, deleteHome, updateUser }
}
