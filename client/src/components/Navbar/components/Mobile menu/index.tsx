import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from 'store';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuthStore();

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-800 hover:text-blue-600 focus:outline-none"
      >
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Полупрозрачный фон */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />

          {/* Само меню */}
          <div className="ml-auto h-full w-3/4 max-w-sm bg-white p-4 shadow-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-800 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="mt-10 flex flex-col gap-4">
              <NavLink
                to="/aboutus"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                About Us
              </NavLink>
              <NavLink
                to="/listings"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                Listings
              </NavLink>
              <NavLink
                to="/support"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
              >
                Support
              </NavLink>
              {user ? (
                <>
                  <NavLink
                    to="/ProfilePage"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    Profile
                  </NavLink>
                  <NavLink
                    to="/mylistings"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    My Listings
                  </NavLink>
                  <NavLink
                    to="/listhome"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    List Home
                  </NavLink>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logOut();
                    }}
                    className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors text-left"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md border-2 border-blue-600 bg-white px-5 py-1.5 font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md border-2 border-blue-600 bg-blue-600 px-5 py-1.5 font-semibold text-white hover:bg-blue-700 transition-colors"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
