import { signUpQuery } from 'api/auth';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store';
import { GoogleSignIn } from 'components/shared';

type Data = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<Data>({ mode: 'onSubmit' });

  const submit = async (data: Data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (file) formData.append('avatar', file);

    toast.promise(signUpQuery(formData), {
      loading: 'Signing up...',
      success: (user) => {
        setUser(user);
        navigate('/');
        return `Successfully signed up as ${user.username}`;
      },
      error: (e) => {
        if (isAxiosError(e) && e.response?.status === 409) {
          return 'User with that email already exists!';
        }
        return 'Error while trying to sign up';
      },
    });
  };

  return (
    <div className="flex items-center justify-center py-10 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Create Account</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Sign up to explore more features</p>

        <form onSubmit={handleSubmit(submit)}>
          {/* Username */}
          <div className="mb-5">
            <input
              type="text"
              {...register('username', { required: true, minLength: 3 })}
              placeholder="Username"
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <input
              type="email"
              {...register('email', {
                required: true,
                validate: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value),
              })}
              placeholder="Email"
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 3,
                validate: () => watch('password') === watch('confirmPassword'),
              })}
              placeholder="Password"
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <input
              type="password"
              {...register('confirmPassword', {
                required: true,
                minLength: 3,
                validate: () => watch('password') === watch('confirmPassword'),
              })}
              placeholder="Confirm Password"
              className={`w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
            />
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
                />
                <span className="text-sm break-all">{file.name}</span>
              </div>
            ) : (
              <span className="font-medium">Drop your avatar or click to select</span>
            )}
            <input
              type="file"
              accept="image/*"
              id="avatar"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              hidden
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Sign Up
          </button>

          <div className="my-4 text-center text-gray-500 dark:text-gray-400">or</div>
          <GoogleSignIn />

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
  );
};

export default SignUp;
