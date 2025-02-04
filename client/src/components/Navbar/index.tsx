import { NavLink } from 'react-router-dom';
import { useAuthStore } from 'store';
import Auth from './components/Auth';
import MobileMenu from './components/Mobile Menu';

const Navbar = () => {
  const { user } = useAuthStore();

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="flex h-20 items-center justify-between px-6 md:px-16">
        {/* Левая часть: логотип и основные ссылки */}
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="RentoHome" className="h-14 w-14" />
            <h1 className="text-3xl font-bold text-[#0093d8]">RentoHome</h1>
          </NavLink>
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/aboutus"
              className="text-lg font-medium text-gray-800 hover:text-[#0093d8] transition-colors"
            >
              About Us
            </NavLink>
            <NavLink
              to="/listings"
              className="text-lg font-medium text-gray-800 hover:text-[#0093d8] transition-colors"
            >
              Listings
            </NavLink>
            <NavLink
              to="/support"
              className="text-lg font-medium text-gray-800 hover:text-[#0093d8] transition-colors"
            >
              Support
            </NavLink>
          </div>
        </div>

        {/* Правая часть: авторизация и мобильное меню */}
        <div className="hidden md:flex items-center gap-4">
          {!user && (
            <div className="flex items-center gap-4">
              <NavLink
                to="/login"
                className="rounded-lg bg-[#ebefff] px-5 py-1.5 font-semibold text-[#0093d8] hover:bg-blue-50 transition-colors"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded-lg bg-[#0093d8] px-5 py-1.5 font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Register
              </NavLink>
            </div>
          )}
          {user && <Auth />}
        </div>

        <MobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
