import { signUpQuery } from 'api/auth'
import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

// Define expected form fields
type Data = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const SignUp: React.FC = () => {
  const navigate = useNavigate()

  // Local state for avatar file and validation flag
  const [file, setFile] = useState<File | null>(null)
  const [avatarError, setAvatarError] = useState(false)

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false)    // toggle password field
  const [showConfirm, setShowConfirm] = useState(false)      // toggle confirm field
  const [showRules, setShowRules] = useState(false)

  // Initialize React Hook Form
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm<Data>({ mode: 'onSubmit' })

  // Watch password field to display live rules
  const password = watch('password', '')

  // Password strength rules 
  const rules = [
    { label: '8+ characters',     valid: password.length >= 8 },
    { label: 'Contains a number', valid: /\d/.test(password) },
    { label: 'Contains a letter', valid: /[A-Za-z]/.test(password) },
  ]

  // Form submit handler
  const submit = async (data: Data) => {
    setAvatarError(false)  // clear avatar errors

    // Build multipart payload
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    if (file) {
      formData.append('avatar', file)
    }

    // Show toast notifications for the sign-up request
    toast.promise(
      signUpQuery(formData),
      {
        loading: 'Signing up...',
        success: () => {
          navigate('/login')
          return 'Account created. Please log in.'
        },
        error: e =>
          isAxiosError(e) && e.response?.status === 409
            ? 'User with this email already exists!'
            : 'Error while trying to sign up'
      }
    )
  }

  return (
    <div className="flex items-center justify-center py-10 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        {/* Form header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Create Account
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Sign up to explore more features
        </p>

        {/* Add noValidate to prevent the browser's built-in “tooltip” */}
        <form noValidate onSubmit={handleSubmit(submit)}>
          {/* Username field */}
          <div className="mb-5">
            <input
              type="text"
              placeholder="Username"
              {...register('username', {
                required: "Username is required",
                minLength: { value: 3, message: "At least 3 characters" },
                maxLength: { value: 20, message: "Max 20 characters" },
                validate: val =>
                  /^[A-Za-z][A-Za-z0-9]*$/.test(val) ||
                  "Start with letter; letters & numbers only"
              })}
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 transition-colors ${
                errors.username
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="mb-5">
            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: "Email is required",
                maxLength: { value: 50, message: "Max 50 characters" },
                pattern: {
                  value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Enter a valid email"
                }
              })}
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 transition-colors ${
                errors.email
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password field with live rule hints */}
          <div className="mb-5">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password', {
                  required: "Password is required",
                  validate: val => {
                    if (val.length < 8) return "8+ characters"
                    if (!/\d/.test(val)) return "At least one number"
                    if (!/[A-Za-z]/.test(val)) return "At least one letter"
                    return true
                  }
                })}
                onFocus={() => setShowRules(true)}
                onBlur={() => setShowRules(false)}
                className={`w-full px-4 py-2 pr-10 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 transition-colors ${
                  errors.password
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
            {showRules && (
              <ul className="mt-2 text-sm space-y-1">
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

          {/* Confirm Password field */}
          <div className="mb-5">
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: "Confirm your password",
                  validate: val =>
                    val === watch('password') || "Passwords do not match"
                })}
                className={`w-full px-4 py-2 pr-10 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 transition-colors ${
                  errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  tabIndex={-1}
                >
                  {showConfirm ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
                </button>
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Avatar upload area */}
          <label className="w-full mb-1 flex flex-col items-center justify-center px-6 py-4 border-2 border-dashed rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 cursor-pointer hover:border-blue-500 transition">
            {file ? (
              // Show preview if file selected
              <div className="flex items-center space-x-4">
                <img
                  src={URL.createObjectURL(file)}
                  alt="avatar preview"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <span className="truncate font-medium">{file.name}</span>
              </div>
            ) : (
              // Placeholder icon + text
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V8m10 8v-8m-5 12l-5-5h3V4h4v11h3l-5 5z"
                  />
                </svg>
                <span className="text-sm">
                  Click or drop to upload avatar (optional)
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              hidden
              onChange={e => {
                const sel = e.target.files?.[0]
                if (!sel) {
                  setFile(null)
                  setAvatarError(false)
                  return
                }
                // Validate file type
                if (!['image/png','image/jpeg','image/jpg'].includes(sel.type)) {
                  setFile(null)
                  setAvatarError(true)
                  return
                }
                // Validate size <2MB
                if (sel.size > 2 * 1024 * 1024) {
                  setFile(null)
                  setAvatarError(true)
                  return
                }
                setFile(sel)
                setAvatarError(false)
              }}
            />
          </label>

          {/* Inline avatar‐error text (directly under avatar drop area) */}
          {avatarError && (
            <p className="text-red-500 text-sm mt-1 mb-4">
              Invalid avatar file. Only JPG/PNG under 2 MB allowed.
            </p>
          )}

          {/* If no avatarError, add some bottom margin before the Sign Up button */}
          {!avatarError && <div className="mb-6" />}

          {/* Sign Up button */}
          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>

          {/* Link to Login page */}
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
