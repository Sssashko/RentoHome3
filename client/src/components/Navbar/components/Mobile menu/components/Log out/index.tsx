import { HiLogout } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from 'store'

const LogOut = () => {
  // Get the logout action from global auth store
  const { logOut } = useAuthStore()

  return (
    // Link that logs the user out when clicked
    <NavLink to="/" className="mt-1 flex items-center gap-2" onClick={logOut}>
      {/* Logout icon */}
      <HiLogout size={35} color="white" />
      {/* Button label */}
      <h2 className="text-xl font-semibold">Logout</h2>
    </NavLink>
  )
}

export default LogOut
