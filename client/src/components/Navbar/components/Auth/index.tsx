import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store';
import toast from 'react-hot-toast';

const Auth = () => {
  const { user, logOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut(); // Вызываем логаут
    toast.success('Logout successfully!'); // Красивый toast-уведомление
    navigate('/'); // Перенаправляем на главную страницу
  };

  if (user) {
    return (
      <div className="flex items-center gap-6">
        <NavLink to="/ProfilePage" className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt={user.username}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">Profile</span>
        </NavLink>
        <NavLink
          to="/mylistings"
          className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-[#0093d8] dark:hover:text-blue-400 transition-colors"
        >
          My Listings
        </NavLink>
        <NavLink
          to="/listhome"
          className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-[#0093d8] dark:hover:text-blue-400 transition-colors"
        >
          List Home
        </NavLink>
        <button
          onClick={handleLogOut}
          className="rounded-lg bg-[#ebefff] px-5 py-1.5 font-semibold text-[#0093d8] hover:bg-blue-50 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-300"
        >
          Log Out
        </button>
      </div>
    );
  }

  return null;
};

export default Auth;
