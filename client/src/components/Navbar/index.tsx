import { NavLink } from 'react-router-dom';

import { Auth, MobileMenu } from './components';

const Navbar = () => (
  <div className="flex h-16 w-full items-center justify-between bg-neutral-700 px-9 md:px-16 mb-10">
    <NavLink to="/" className="flex cursor-pointer items-center gap-3.5">
      <img src="/logo.png" className="h-12 w-12" />
      <h1 className="text-2xl font-bold text-white">RentoHome</h1>
    </NavLink>

    <div className="hidden md:flex items-center gap-8">
      <NavLink
        to="/listings"
        className={({ isActive }) =>
          `text-lg font-medium ${
            isActive ? 'text-blue-400' : 'text-white'
          } hover:text-blue-300`
        }
      >
        Listings
      </NavLink>
    </div>

    <MobileMenu />
    <Auth />
  </div>
);

export default Navbar;
