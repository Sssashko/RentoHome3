import { signUpQuery } from 'api/auth'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store'

type Data = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [file, setFile] = useState<File | null>(null)
  const [avatarError, setAvatarError] = useState(false)

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Data>({ mode: 'onSubmit' })

  const submit = async (data: Data) => {
    if (!file) {
      setAvatarError(true)
      return
    }
    setAvatarError(false)

    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('avatar', file)

    toast.promise(signUpQuery(formData), {
      loading: 'Signing up...',
      success: (user) => {
        setUser(user)
        navigate('/')
        return `Successfully signed up as ${user.username}`
      },
      error: (e) => {
        if (isAxiosError(e) && e.response?.status === 409) {
          return 'User with that email already exists!'
        }
        return 'Error while trying to sign up'
      },
    })
  }

  const [showRules, setShowRules] = useState(false)
  const password = watch('password', '')
  const rules = [
    { label: '8+ characters', valid: password.length >= 8 },
    { label: 'Contains a number', valid: /\d/.test(password) },
    { label: 'Contains a letter', valid: /[A-Za-z]/.test(password) },
  ]

  return (
    <div className="flex items-center justify-center py-10 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Create Account
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Sign up to explore more features
        </p>

        <form onSubmit={handleSubmit(submit)}>
          {/* Username */}
          <div className="mb-5">
            <input
              type="text"
              {...register('username', {
                required: "Username is required",
                minLength: { value: 3, message: "Username must be at least 3 characters long" },
                maxLength: { value: 20, message: "Username cannot exceed 20 characters" },
                validate: (value) =>
                  /^[a-zA-Z]+[a-zA-Z0-9]*$/.test(value)
                    ? true
                    : "Username must start with a letter and contain only letters and numbers (no special characters)",
              })}
              placeholder="Username"
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <input
              type="email"
              {...register('email', {
                required: "Email is required",
                maxLength: { value: 50, message: "Email cannot exceed 50 characters" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email"
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <input
              type="password"
              {...register('password', {
                required: "Password is required",
                validate: (value) => {
                  if (value.length < 8) return "Must have 8+ characters"
                  if (!/\d/.test(value)) return "Must contain at least one number"
                  if (!/[A-Za-z]/.test(value)) return "Must contain at least one letter"
                  return true
                },
              })}
              placeholder="Password"
              onFocus={() => setShowRules(true)}
              onBlur={() => setShowRules(false)}
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}

            {showRules && (
              <ul className="mt-2 space-y-1 text-sm">
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

          {/* Confirm Password */}
          <div className="mb-5">
            <input
              type="password"
              {...register('confirmPassword', {
                required: "Confirm your password",
                validate: (value) =>
                  value === watch('password') || "Passwords do not match",
              })}
              placeholder="Confirm Password"
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Avatar Upload */}
          <label
            htmlFor="avatar"
            className="mb-5 flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-4 text-gray-600 dark:text-gray-400 cursor-pointer hover:border-blue-500 transition"
          >
            {file ? (
              <div className="flex items-center gap-3">
                <img
                  src={URL.createObjectURL(file)}
                  className="h-10 w-10 rounded-full object-cover"
                  alt="avatar preview"
                />
                <span className="text-sm break-all">{file.name}</span>
              </div>
            ) : (
              <span className="font-medium">Drop your avatar or click to select</span>
            )}
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              id="avatar"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0]
                if (!selectedFile) {
                  setFile(null)
                  return
                }
                if (!["image/png", "image/jpeg", "image/jpg"].includes(selectedFile.type)) {
                  toast.error("Only JPG, JPEG, and PNG formats are allowed")
                  setFile(null)
                  return
                }
                if (selectedFile.size > 2 * 1024 * 1024) {
                  toast.error("Image must be less than 2MB")
                  setFile(null)
                  return
                }
                setFile(selectedFile)
                setAvatarError(false)
              }}
              hidden
            />
          </label>
          {avatarError && (
            <p className="text-red-500 text-sm mb-5">You must upload an avatar</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Sign Up
          </button>

          <div className="mt-6 text-center">
            <NavLink
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Already have an account?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
