import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store'
import toast from 'react-hot-toast'

const Auth = () => {
  const { user, logOut } = useAuthStore()  // get current user and logout action
  const navigate = useNavigate()           // hook to change route

  // handle logout click: clear state, show toast, redirect
  const handleLogOut = async () => {
    await logOut()
    toast.success('Logout successful!')
    navigate('/')
  }

  if (!user) return null  // nothing to render when not logged in

  return (
    <div className="flex items-center gap-6">
      {/* Link to profile page with user's avatar */}
      <NavLink to="/ProfilePage" className="flex items-center gap-2">
        <img
          src={user.avatar}
          alt={user.username}
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Profile
        </span>
      </NavLink>

      {/* Link to user's listings */}
      <NavLink
        to="/mylistings"
        className="
          text-lg font-medium text-gray-800 dark:text-gray-200
          hover:text-[#0093d8] dark:hover:text-blue-400
          transition-colors
        "
      >
        My Listings
      </NavLink>

      {/* Link to list a new home */}
      <NavLink
        to="/listhome"
        className="
          text-lg font-medium text-gray-800 dark:text-gray-200
          hover:text-[#0093d8] dark:hover:text-blue-400
          transition-colors
        "
      >
        List Home
      </NavLink>

      {/* Logout button */}
      <button
        onClick={handleLogOut}
        className="
          rounded-lg bg-[#ebefff] px-5 py-1.5 font-semibold
          text-[#0093d8] hover:bg-blue-50 transition-colors
          dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-300
        "
      >
        Log Out
      </button>
    </div>
  )
}

export default Auth
