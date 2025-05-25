import { useState } from 'react'
import toast from 'react-hot-toast'
import { User, Home } from 'types'

interface Props {
  users: User[]                     
  homes: Home[]                     
  onDeleteUser: (id: number) => Promise<void>   
  onDeleteHome: (id: number) => Promise<void>   
  onUpdateUser: (id: number, data: Partial<User>) => Promise<void> 
}

export default function AdminPanel({ users, homes, onDeleteUser, onDeleteHome, onUpdateUser }: Props) {
  // ID of the user currently being edited (null if none)
  const [editingId, setEditingId] = useState<number | null>(null)
  // Local form state for editing user fields
  const [form, setForm] = useState<{ username: string; email: string; password?: string; avatar?: File | null }>({ username: '', email: '' })

  // Toggle edit mode: if same ID, cancel; otherwise load user data into form
  const startEdit = (u: User) => {
    if (editingId === u.id) {
      setEditingId(null)
    } else {
      setEditingId(u.id)
      setForm({ username: u.username, email: u.email, password: '', avatar: null })
    }
  }

  // Save edits: build FormData, call update, show toast, reset editing mode
  const saveEdit = async () => {
    if (!editingId) return
    try {
      const body = new FormData()
      body.append('username', form.username)
      body.append('email', form.email)
      if (form.password) body.append('password', form.password) // include password if changed
      if (form.avatar)  body.append('avatar', form.avatar)       // include avatar file if provided
      await onUpdateUser(editingId, body as any)
      toast.success('User updated')
      setEditingId(null)
    } catch {
      toast.error('Failed to update user')
    }
  }

  // Confirm and delete user, show toast messages
  const handleUserDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      await onDeleteUser(id)
      toast.success('User deleted.')
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete user.')
    }
  }

  // Confirm and delete home listing, show toast messages
  const handleHomeDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this listing?')) return
    try {
      await onDeleteHome(id)
      toast.success('Listing deleted.')
    } catch {
      toast.error('Failed to delete listing.')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-8">
      <h2 className="text-2xl font-semibold">Admin Panel</h2>

      {/* USERS */}
      <section>
        <h3 className="text-xl font-medium mb-4">Users</h3>

        {/* Show edit form when a user is selected for editing */}
        {editingId && (
          <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner">
            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-2 border rounded bg-white dark:bg-gray-600"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                placeholder="Username"
              />
              <input
                className="p-2 border rounded bg-white dark:bg-gray-600"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="Email"
              />
              <input
                className="p-2 border rounded bg-white dark:bg-gray-600 col-span-2"
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="New Password"
              />
              <input
                className="p-2 border rounded bg-white dark:bg-gray-600 col-span-2"
                type="file"
                onChange={e => setForm(f => ({ ...f, avatar: e.target.files?.[0] || null }))}
              />
            </div>
            <div className="mt-4 space-x-2">
              <button onClick={saveEdit} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Save</button>
              <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition">Cancel</button>
            </div>
          </div>
        )}

        {/* List each user with Edit/Delete controls */}
        <ul className="space-y-3 max-h-96 overflow-auto">
          {users.map(u => (
            <li
              key={u.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={u.avatar || '/default-avatar.png'}
                  alt={u.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {u.username}{' '}
                  <span className="text-gray-500 dark:text-gray-400 text-sm">({u.email})</span>
                </span>
              </div>
              {/* Action buttons: Edit toggle and Delete */}
              <div className="space-x-2">
                <button
                  onClick={() => startEdit(u)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                >
                  {editingId === u.id ? 'Close' : 'Edit'}
                </button>
                <button
                  onClick={() => handleUserDelete(u.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* LISTINGS */}
      <section>
        <h3 className="text-xl font-medium mb-4">Listings</h3>
        <ul className="space-y-3 max-h-96 overflow-auto">
          {homes.map(h => (
            <li
              key={h.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded"
            >
              {/* Listing info: title and price */}
              <span className="text-gray-900 dark:text-gray-100">
                {h.title || `#${h.id}`} — ${h.price.toLocaleString()}
              </span>
              <button
                onClick={() => handleHomeDelete(h.id)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
