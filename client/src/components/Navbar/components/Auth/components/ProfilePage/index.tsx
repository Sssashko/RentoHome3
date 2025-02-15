import { Menu } from '@headlessui/react';
import { CgProfile } from 'react-icons/cg';
import { NavLink } from 'react-router-dom';

const Profile = () => (
  <Menu.Item>
    <NavLink
      to="/ProfilePage"
      className="my-0.5 flex cursor-pointer items-center gap-2 px-6 py-px text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <CgProfile size={25} className="text-gray-800 dark:text-gray-200" />
      <h2 className="text-lg font-semibold">Profile Page</h2>
    </NavLink>
  </Menu.Item>
);

export default Profile;
