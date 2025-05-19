import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuthStore } from 'store'
import updateProfile from 'api/profile/profile'
import deleteUserQuery from 'api/delete user/user'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useFilteredHomes } from 'hooks'
import { Home } from 'types'

// Define form data shape for React Hook Form
type FormData = {
  username: string
  email: string
  password?: string
  avatar?: FileList
}

const ProfilePage = () => {
  // Access current user and auth actions from global store
  const { user, setUser, logOut } = useAuthStore()
  const navigate = useNavigate()

  // Load all homes and filter those created by this user
  const homes: Home[] = useFilteredHomes()
  const userHomes = homes.filter(h => h.user?.id === user?.id)

  // Initialize form with default values and validation state
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

  // Watch the password input to display live validation rules
  const password: string = watch('password') ?? ''
  const [showRules, setShowRules] = useState(false)

  // Password validation rules identical to Sign Up page
  const rules = [
    { label: '8+ characters',      valid: password.length >= 8 },
    { label: 'Contains a number',  valid: /\d/.test(password) },
    { label: 'Contains a letter',  valid: /[A-Za-z]/.test(password) },
  ]

  // Handle form submission: validate avatar, send update request
  const onSubmit = async (data: FormData) => {
    if (!user) return

    // Manual avatar file validation
    let file: File | undefined
    if (data.avatar?.length) {
      file = data.avatar[0]
      if (!['image/png','image/jpeg','image/jpg'].includes(file.type)) {
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
      // Build FormData for multipart upload
      const formData = new FormData()
      formData.append('id', String(user.id))
      formData.append('username', data.username)
      formData.append('email', data.email)
      if (data.password) formData.append('password', data.password)
      if (file) formData.append('avatar', file)

      // Send update request and update global store
      const updated = await updateProfile(formData)
      setUser({
        ...user,
        username: updated.username,
        email: updated.email,
        avatar: updated.avatar ? `${updated.avatar}?t=${Date.now()}` : user.avatar
      })

      // Notify user and force re-login to refresh session
      toast.success('Profile updated – please log in again')
      await logOut()
      setUser(null)
      navigate('/login')
    } catch {
      toast.error('Error updating profile')
    }
  }

  // Handle user deletion with confirmation prompt
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
    } catch {}
  }

  // If no user is logged in, render nothing
  if (!user) return null

  return (
    <div className="bg-gray-150 dark:bg-gray-900 p-6 sm:p-12 flex justify-center items-start">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6 lg:gap-8">
        {/* Profile form column */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-80 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md space-y-6"
        >
          {/* Avatar preview and upload */}
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
            <label className="mt-4 text-base sm:text-lg text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
              Change avatar
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
                {...register('avatar')}
              />
            </label>
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-2">{errors.avatar.message}</p>
            )}
          </div>

          <div className="space-y-4">
            {/* Username field */}
            <div>
              <label className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-1 font-medium">
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
                className="w-full px-2 py-2 sm:px-4 sm:py-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-sm sm:text-base"
              />
              {errors.username && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email field */}
            <div>
              <label className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-1 font-medium">
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
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-sm sm:text-base"
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* New password with live validation hints */}
            <div>
              <label className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-1 font-medium">
                New Password
              </label>
              <input
                type="password"
                placeholder="Leave blank to keep current"
                {...register('password', {
                  validate: val => {
                    if (!val) return true
                    if (val.length < 8) return 'Must have 8+ characters'
                    if (!/\d/.test(val)) return 'Must contain at least one number'
                    if (!/[A-Za-z]/.test(val)) return 'Must contain at least one letter'
                    return true
                  }
                })}
                onFocus={() => setShowRules(true)}
                onBlur={() => setShowRules(false)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border rounded-md bg-gray-100 dark:bg-gray-700 text-sm sm:text-base"
              />
              {errors.password && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.password.message}</p>
              )}
              {showRules && (
                <ul className="mt-2 text-xs sm:text-sm space-y-1">
                  {rules.map(({ label, valid }) => (
                    <li key={label} className="flex items-center">
                      <span
                        className={`w-2 h-2 rounded-full mr-2 ${
                          valid ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                      <span className={valid ? 'text-green-600' : 'text-red-600'}>
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Save and Delete buttons */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
          >
            Delete Profile
          </button>
        </form>

        {/* User's homes listing */}
        <div className="w-full lg:flex-1 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
            Your Homes
          </h2>
          {userHomes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userHomes.map(({ id, title, price, images, square }) => (
                <div
                  key={id}
                  className="
                    bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-lg dark:shadow-black/40 hover:shadow-2xl dark:hover:shadow-black/60 transform hover:-translate-y-1 transition
                  "
                >
                  <div className="relative">
                    <img
                      src={images?.[0]?.url || '/default-home.jpg'}
                      alt={title}
                      className="w-full h-48 object-cover"
                    />
                    {/* небольшой градиент-оверлей внизу фото */}
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {title || `Home ${id}`}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      <span className="font-semibold">Price:</span> ${price.toLocaleString()}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <span className="font-semibold">Area:</span> {square} m²
                    </p>
                    <button
                      onClick={() => navigate(`/${id}`)}
                      className="
                        w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition
                      "
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
    </div>
  )
}

export default ProfilePage
