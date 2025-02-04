import { NavLink } from 'react-router-dom';
import { useAuthStore } from 'store';

const Auth = () => {
  const { user, logOut } = useAuthStore();

  if (user) {
    return (
      <div className="flex items-center gap-6">
        <NavLink to="/ProfilePage" className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt={user.username}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-lg font-semibold text-gray-800">Profile</span>
        </NavLink>
        <NavLink
          to="/mylistings"
          className="text-lg font-medium text-gray-800 hover:text-[#0093d8] transition-colors"
        >
          My Listings
        </NavLink>
        <NavLink
          to="/listhome"
          className="text-lg font-medium text-gray-800 hover:text-[#0093d8] transition-colors"
        >
          List Home
        </NavLink>
        <button
          onClick={logOut}
          className="rounded-md border-2 border-[#0093d8] bg-white px-5 py-1.5 font-semibold text-[#0093d8] hover:bg-blue-50 transition-colors"
        >
          Log Out
        </button>
      </div>
    );
  }

  return null;
};

export default Auth;
