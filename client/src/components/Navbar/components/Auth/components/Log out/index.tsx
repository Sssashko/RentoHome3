import { Menu } from '@headlessui/react'
import { HiLogout } from 'react-icons/hi'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store'

const LogOut = () => {
  const { logOut } = useAuthStore()    // get logout action from global store
  const navigate = useNavigate()       // hook to programmatically change route

  // perform logout, then redirect to homepage
  const handleLogOut = () => {
    logOut()
    navigate('/')
  }

  return (
    <Menu.Item>
      {/* Menu item that logs out the user */}
      <NavLink
        to="/"
        onClick={handleLogOut}  // trigger our logout+redirect logic
        className="
          my-0.5 flex cursor-pointer items-center gap-2
          px-6 py-2 text-gray-800 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-700
          transition-colors rounded-md
        "
      >
        {/* Logout icon */}
        <HiLogout size={25} />
        {/* Button label */}
        <h2 className="text-lg font-semibold">Logout</h2>
      </NavLink>
    </Menu.Item>
  )
}

export default LogOut
