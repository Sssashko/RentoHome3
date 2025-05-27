import { useState } from 'react'                            
import { useForm } from 'react-hook-form'                     
import { useNavigate } from 'react-router-dom'  
import { FaEye, FaEyeSlash } from 'react-icons/fa'              
import toast from 'react-hot-toast'

import { useAuthStore } from 'store'                          
import updateProfile from 'api/profile/profile'                
import deleteUserQuery from 'api/delete user/user'             
import { useFilteredHomes } from 'hooks'                       
import { useAdminData } from 'hooks/useAdminData'              

import AdminPanel from '../../components/Profile Page/Admin Panel' 

// Define the shape of form data expected
type FormData = {
  username: string      
  email: string         
  password?: string
  avatar?: FileList     
}

const ProfilePage = () => {
  const navigate = useNavigate()                           // Router navigation helper

  // 1) Authorization: retrieve current user and auth actions
  const { user, setUser, logOut } = useAuthStore()

  // 2) Admin data: lists of all users and homes, plus CRUD functions
  const { users, homes, deleteUser, deleteHome, updateUser } = useAdminData()

  // 3) User's homes: filter all homes by current user's ID
  const allHomes = useFilteredHomes()
  const userHomes = allHomes.filter(h => h.user?.id === user?.id)

  // 4) Form setup: initialize react-hook-form with user defaults
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: '',
      avatar: undefined
    }
  })

  // 5) Password hints: track password field and show rules
  const [showPassword, setShowPassword] = useState(false)
  const [showRules, setShowRules] = useState(false)
  const password = watch('password') ?? ''
  const rules = [
    { label: '8+ characters',     valid: password.length >= 8 },
    { label: 'Contains a number', valid: /\d/.test(password) },
    { label: 'Contains a letter', valid: /[A-Za-z]/.test(password) }
  ]

  // 6) Handle profile form submission
  const onSubmit = async (data: FormData) => {
    if (!user) return

    // Check for any changes
    const fileProvided = !!data.avatar?.length
    const pwProvided   = Boolean(data.password)
    if (
      data.username === user.username &&
      data.email    === user.email &&
      !pwProvided &&
      !fileProvided
    ) {
      toast.error('No modifications detected')
      return
    }

    // Validate avatar file locally
    let file: File | undefined
    if (data.avatar?.length) {
      file = data.avatar[0]
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
        setError('avatar', { type: 'manual', message: 'Only JPG/JPEG/PNG allowed' })
        return
      }
      if (file.size > 2 * 1024 ** 2) {
        setError('avatar', { type: 'manual', message: 'Max size 2MB' })
        return
      }
      clearErrors('avatar')
    }

    try {
      // Prepare FormData for API request
      const formData = new FormData()
      formData.append('id', String(user.id))
      formData.append('username', data.username)
      formData.append('email', data.email)
      if (data.password) formData.append('password', data.password)
      if (file) formData.append('avatar', file)

      // Perform API call to update profile
      const updated = await updateProfile(formData)

      // Update auth store and enforce re-login
      setUser({
        ...user,
        username: updated.username,
        email: updated.email,
        avatar: updated.avatar ? `${updated.avatar}?t=${Date.now()}` : user.avatar
      })
      toast.success('Profile updated – please log in again')
      await logOut()
      setUser(null)
      navigate('/login')
    } catch {
      toast.error('Error updating profile')
    }
  }

  // 7) Handle profile deletion
  const handleDelete = async () => {
    if (!user) return
    if (!confirm('Delete profile? This cannot be undone.')) return

    try {
      await toast.promise(deleteUserQuery(user.id), {
        loading: 'Deleting user...',
        success: 'Deleted ✓',
        error: 'Delete failed'
      })
      await logOut()
      setUser(null)
      navigate('/')
    } catch {
      // ignore errors here or show toast if desired
    }
  }

  if (!user) return null  // Guard: no user, render nothing

  return (
    <div className="bg-gray-150 dark:bg-gray-900 p-6 sm:p-12">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto gap-6 lg:gap-8">
        {/* PROFILE FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-80 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
        >
          {/* AVATAR UPLOAD & PREVIEW */}
          <div className="flex flex-col items-center">
            <img
              src={
                watch('avatar')?.length
                  ? URL.createObjectURL(watch('avatar')![0])
                  : user.avatar
              }
              alt="Profile"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-300 shadow-lg"
            />
            <label className="mt-4 text-blue-600 hover:underline cursor-pointer">
              Change avatar
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                {...register('avatar')}
              />
            </label>
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-2">
                {errors.avatar.message}
              </p>
            )}
          </div>

          {/* FIELDS: Username, Email, New Password */}
          <div className="space-y-4">
            {/* Username field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                {...register('username', {
                  required: 'Username required',
                  minLength: { value: 3, message: 'At least 3 characters' },
                  maxLength: { value: 40, message: 'Max 40 characters' },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/,
                    message: 'Letters and numbers only'
                  },
                  validate: v => !/^\d+$/.test(v) || 'Cannot be only numbers'
                })}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email required',
                  maxLength: { value: 50, message: 'Max 50 characters' },
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Invalid format'
                  }
                })}
                className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* New Password field with validation hints */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <div className="relative">

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Leave blank to keep current"
                {...register('password', {
                  validate: val => {
                    if (!val) return true
                    if (val.length < 8) return '8+ characters required'
                    if (!/\d/.test(val)) return 'Must contain a number'
                    if (!/[A-Za-z]/.test(val)) return 'Must contain a letter'
                    return true
                  }
                })}
                onFocus={() => setShowRules(true)}
                onBlur={() => setShowRules(false)}
                className="w-full px-3 py-2 pr-10 border rounded-md bg-gray-100 dark:bg-gray-700"
              />
            <span className="absolute inset-y-0 right-3 flex items-center">
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
              </button>
            </span>
            </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              {showRules && (
                <ul className="mt-2 text-xs space-y-1">
                  {rules.map(({ label, valid }) => (
                    <li key={label} className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${valid ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={valid ? 'text-green-600' : 'text-red-600'}>{label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Save changes or delete profile */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 text-white rounded-md"
          >
            {isSubmitting ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full py-2 bg-red-600 text-white rounded-md"
          >
            Delete Profile
          </button>
        </form>

        {/* Display user's homes */}
        <div className="w-full lg:flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Homes
          </h2>
          {userHomes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userHomes.map(({ id, title, images }) => (
                <div key={id} className="bg-white dark:bg-gray-700 rounded-2xl shadow-lg">
                  <img
                    src={images?.[0]?.url || '/default-home.jpg'}
                    alt={title}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{title}</h3>
                    {/* <p className="mt-1">${price.toLocaleString()}</p>
                    <p className="mt-1">{square} m²</p> */}
                    <button
                      onClick={() => navigate(`/${id}`)}
                      className="mt-3 w-full py-1 rounded bg-blue-500 text-white transition-colors duration-200 hover:bg-blue-600"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">You have no homes listed.</p>
          )}
        </div>
      </div>

      {/* Admin Panel (visible only to admins) */}
      {user.role === 'admin' && (
        <div className="mt-10 max-w-6xl mx-auto">
          <AdminPanel
            users={users}
            homes={homes}
            onDeleteUser={deleteUser}
            onDeleteHome={deleteHome}
            onUpdateUser={updateUser}
          />
        </div>
      )}
    </div>
  )
}

export default ProfilePage
