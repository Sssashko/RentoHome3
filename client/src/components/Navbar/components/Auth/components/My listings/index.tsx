import { Menu } from '@headlessui/react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const MyListings = () => (
  <Menu.Item>
    <NavLink
      to="/mylistings"
      className="my-0.5 flex cursor-pointer items-center gap-2 px-6 py-px text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <FaHome size={25} className="text-gray-800 dark:text-gray-200" />
      <h2 className="text-lg font-semibold">My Listings</h2>
    </NavLink>
  </Menu.Item>
);

export default MyListings;
