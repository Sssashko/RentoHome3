import { logInQuery } from 'api/auth'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'


type Data = {
  email: string
  password: string
}

const LogIn = () => {
  const navigate = useNavigate()               // hook to programmatically change routes
  const { setUser } = useAuthStore()           // action to store authenticated user in global state

  // toggle password visibility
  const [showPass, setShowPass] = useState(false)

  // initialize react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>()

  // form submit handler
  const submit = async (data: Data) => {
    // show toast notifications for login promise
    toast.promise(
      logInQuery(data),                        // API call returning user object
      {
        loading: 'Logging in...',              // shown while request is pending
        success: (user) => {
          setUser(user)                        // save user in Zustand store
          navigate('/ProfilePage')             // redirect to profile page
          return `Successfully logged in as ${user.username}`  
        },
        error: (e) => {
          // if backend returns 401, show specific message
          if (isAxiosError(e) && e.response?.status === 401) {
            return 'Wrong credentials!'
          }
          return 'Error while trying to log in'  // generic error message
        },
      }
    )
  }

  return (
    <div className="flex items-center justify-center py-10 bg-gray-50 dark:bg-gray-900">
      {/* form card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        {/* header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Log in to your account
        </p>

        {/* form start */}
        <form onSubmit={handleSubmit(submit)}>
          {/* email input */}
          <div className="mb-5">
            <input
              type="text"
              {...register('email', { required: true })}
              placeholder="Email"
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
          </div>

          {/* password input */}
          <div className="mb-5">
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                {...register('password', { required: true })}
                placeholder="Password"
                className={`w-full px-4 py-2 pr-10 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                }`}
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  tabIndex={-1}
                >
                  {showPass ? <FaEyeSlash size={18}/> : <FaEye size={18}/>}
                </button>
              </span>
            </div>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Log In
          </button>

          {/* link to signup page */}
          <div className="mt-6 text-center">
            <NavLink
              to="/signup"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Don't have an account yet?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogIn
