import { Menu } from '@headlessui/react';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';

const ListHome = () => (
  <Menu.Item>
    <NavLink
      to="/listhome"
      className="my-0.5 flex cursor-pointer items-center gap-2 px-6 py-px text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <BiMessageSquareAdd size={25} className="text-gray-800 dark:text-gray-200" />
      <h2 className="text-lg font-semibold">List Home</h2>
    </NavLink>
  </Menu.Item>
);

export default ListHome;
