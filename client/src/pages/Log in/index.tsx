import { logInQuery } from 'api/auth'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store'
import { GoogleSignIn } from 'components/shared'

type Data = {
  email: string
  password: string
}

const LogIn = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>()

  const submit = async (data: Data) => {
    toast.promise(logInQuery(data), {
      loading: 'Logging in...',
      success: (user) => {
        setUser(user)
        navigate('/ProfilePage')
        return `Successfully logged in as ${user.username}`
      },
      error: (e) => {
        if (isAxiosError(e) && e.response?.status === 401) {
          return 'Wrong credentials!'
        }
        return 'Error while trying to log in'
      },
    })
  }

  return (
    <div className="flex items-center justify-center py-10 bg-gray-50">
      {/* Уменьшил вертикальные отступы, заменив min-h-screen на py-10 */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-6">Log in to your account</p>

        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-5">
            <input
              type="text"
              {...register('email', { required: true })}
              placeholder="Email"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="Password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
          >
            Log In
          </button>

          <div className="my-4 text-center text-gray-500">or</div>
          <GoogleSignIn />

          <div className="mt-6 text-center">
            <NavLink
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
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
