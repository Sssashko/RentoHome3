import { NavLink } from 'react-router-dom';
import { useAuthStore } from 'store';
import Auth from './components/Auth';
import MobileMenu from './components/Mobile menu';
import { ThemeToggle } from '../shared/ThemeToogle'; // Импортируем компонент ThemeToggle

const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <nav className="w-full bg-white shadow-md dark:bg-gray-800">
      <div className="flex h-20 items-center justify-between px-6 md:px-16">
        {/* Left side: logo and main links */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="RentoHome" className="h-14 w-14" />
            <h1 className="text-3xl font-bold text-[#0093d8] dark:text-blue-400">
              RentoHome
            </h1>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/aboutus"
              className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-[#0093d8] dark:hover:text-blue-400 transition-colors"
            >
              About Us
            </NavLink>
            <NavLink
              to="/listings"
              className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-[#0093d8] dark:hover:text-blue-400 transition-colors"
            >
              Listings
            </NavLink>
            <NavLink
              to="/support"
              className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-[#0093d8] dark:hover:text-blue-400 transition-colors"
            >
              Support
            </NavLink>
          </div>
        </div>

        {/* Right side: auth, theme toggle, and mobile menu */}
        <div className="hidden md:flex items-center gap-4">
          {/* Кнопка переключения темы */}

          {!user && (
            <div className="flex items-center gap-4">
              <NavLink
                to="/login"
                className="rounded-lg bg-[#ebefff] px-5 py-1.5 font-semibold text-[#0093d8] hover:bg-blue-50 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded-lg bg-[#0093d8] px-5 py-1.5 font-semibold text-white hover:bg-blue-700 transition-colors dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Register
              </NavLink>
            </div>
          )}


          {user && <Auth />}

          
          <ThemeToggle /> 
        </div>

        {/* Кнопка мобильного меню */}
        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;