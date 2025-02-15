import { Menu } from '@headlessui/react';
import { HiLogout } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'store';

const LogOut = () => {
  const { logOut } = useAuthStore();
  const navigate = useNavigate(); // Добавляем навигацию

  const handleLogOut = () => {
    logOut(); // Вызываем метод выхода
    navigate('/'); // Перенаправляем на главную страницу
  };

  return (
    <Menu.Item>
      <NavLink
        to="/"
        className="my-0.5 flex cursor-pointer items-center gap-2 px-6 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-md"
        onClick={handleLogOut} // Обновлённый обработчик
      >
        <HiLogout size={25} className="text-gray-800 dark:text-gray-200" />
        <h2 className="text-lg font-semibold">Logout</h2>
      </NavLink>
    </Menu.Item>
  );
};

export default LogOut;
