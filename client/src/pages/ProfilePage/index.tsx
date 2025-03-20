import React, { useState } from 'react';
import { useAuthStore } from 'store';
import updateProfile from 'api/profile/profile';
import deleteUserQuery from 'api/delete user/user'; // тот самый запрос для удаления
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFilteredHomes } from 'hooks';
import { Home } from 'types';

const ProfilePage = () => {
  const { user, setUser, logOut } = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);

  const homes: Home[] = useFilteredHomes();
  const userHomes = homes.filter((home) => home.user?.id === user?.id);

  if (!user) return null;

  const handleSave = async () => {
    // Проверка, что пользователь авторизован
    if (!user) {
      toast.error('User not found. Please log in again.');
      return;
    }

    // Валидация имени пользователя
    if (username.length < 3) {
      toast.error('Username must be at least 3 characters long.');
      return;
    }
    if (username.length > 40) {
      toast.error('Username must be under 40 characters.');
      return;
    }
    if (/^\d+$/.test(username)) {
      toast.error('Username cannot contain only numbers.');
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      toast.error('Username cannot contain special characters.');
      return;
    }

    // Валидация email
    if (email.length > 50) {
      toast.error('Email must be under 50 characters.');
      return;
    }
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast.error('Invalid email format.');
      return;
    }

    // Валидация пароля (если вводится новый)
    if (password) {
      if (password === user.password) {
        toast.error('New password cannot be the same as the old password.');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters long.');
        return;
      }
      if (password.length > 40) {
        toast.error('Password must be under 40 characters.');
        return;
      }
      if (!/\d.*\d/.test(password)) {
        toast.error('Password must contain at least 2 numbers.');
        return;
      }
      if (/\s/.test(password)) {
        toast.error('Password cannot contain spaces.');
        return;
      }
    }

    // Валидация аватара (если загружается новый)
    if (avatar) {
      if (!['image/png', 'image/jpeg', 'image/jpg'].includes(avatar.type)) {
        toast.error('Only JPG, JPEG, and PNG formats are allowed.');
        return;
      }
      if (avatar.size > 2 * 1024 * 1024) {
        toast.error('Image must be under 2MB.');
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append('id', String(user.id));
      formData.append('username', username);
      formData.append('email', email);
      if (password) formData.append('password', password);
      if (avatar) formData.append('avatar', avatar);

      const updatedUser = await updateProfile(formData);

      // Обновляем данные в store
      setUser({
        ...user,
        username: updatedUser.username,
        email: updatedUser.email,
        avatar: updatedUser.avatar
          ? `${updatedUser.avatar}?timestamp=${Date.now()}`
          : user.avatar,
      });

      toast.success('Profile updated! Please log in again.');
      await logOut();
      setUser(null);
      navigate('/login');
    } catch (error) {
      toast.error('Error updating profile.');
    }
  };

  // Обработчик удаления пользователя
  const handleDelete = async () => {
    if (!user) return;

    // Защита от случайного клика — confirm-окно:
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your profile? This action cannot be undone.'
    );
    if (!confirmDelete) return;

    try {
      await toast.promise(deleteUserQuery(user.id), {
        loading: 'Deleting user...',
        success: 'User deleted successfully!',
        error: 'Error deleting user',
      });
      // После удачного удаления — выходим из аккаунта и сбрасываем user
      await logOut();
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10 flex flex-col items-center">
      <div className="mt-5 grid gap-6 lg:grid-cols-3 w-full max-w-6xl">
        {/* Блок профиля */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center">
          <img
            src={avatar ? URL.createObjectURL(avatar) : user.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
          />

          <label className="mt-4 cursor-pointer text-blue-600 dark:text-blue-400 hover:underline">
            Change avatar
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
            />
          </label>

          <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
            {username}
          </h2>

          <div className="mt-4 w-full max-w-md">
            {/* Username */}
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white mb-4"
            />

            {/* Email */}
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white mb-4"
            />

            {/* Password */}
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white mb-4"
            />

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="mt-6 w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-600"
            >
              Save
            </button>

            {/* Delete Profile Button */}
            <button
              onClick={handleDelete}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-500"
            >
              Delete Profile
            </button>
          </div>
        </div>

        {/* Блок домов пользователя */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Your Homes
          </h2>

          {userHomes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userHomes.map(({ id, title, price, images, square }) => (
                <div
                  key={id}
                  className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg"
                >
                  <img
                    src={images?.[0]?.url || '/default-home.jpg'}
                    alt={`Home ${id}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-2">
                    {title || `Home ${id}`}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Price: ${price.toLocaleString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Area: {square} m²
                  </p>

                  {/* Кнопка "View" */}
                  <button
                    onClick={() => navigate(`/${id}`)}
                    className="mt-4 w-full bg-blue-500 text-white py-1 rounded-md font-semibold hover:bg-blue-600"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              You have no homes listed.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
