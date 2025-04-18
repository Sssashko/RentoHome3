import { logInQuery } from 'api/auth';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store';

type Data = {
  email: string;
  password: string;
};

const LogIn = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Data>();

  const submit = async (data: Data) => {
    toast.promise(logInQuery(data), {
      loading: 'Logging in...',
      success: (user) => {
        setUser(user);
        navigate('/ProfilePage');
        return `Successfully logged in as ${user.username}`;
      },
      error: (e) => {
        if (isAxiosError(e) && e.response?.status === 401) {
          return 'Wrong credentials!';
        }
        return 'Error while trying to log in';
      },
    });
  };

  return (
    <div className="flex items-center justify-center py-10 bg-gray-50 dark:bg-gray-900">
      {/* Обертка формы */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Log in to your account
        </p>

        <form onSubmit={handleSubmit(submit)}>
          {/* Email */}
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

          {/* Password */}
          <div className="mb-5">
            <input
              type="password"
              {...register('password', { required: true })}
              placeholder="Password"
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-1 focus:ring-blue-500 transition-colors ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Log In
          </button>

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
  );
};

export default LogIn;
