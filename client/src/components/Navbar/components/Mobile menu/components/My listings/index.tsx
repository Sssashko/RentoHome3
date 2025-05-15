import { BiMessageSquareAdd } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'

const MyListings = () => (
  // Link to the page showing the user's own listings
  <NavLink to="/mylistings" className="mt-1 flex items-center gap-2">
    {/* Icon for “My Listings” */}
    <BiMessageSquareAdd size={35} color="white" />
    {/* Button label */}
    <h2 className="text-xl font-semibold">My listings</h2>
  </NavLink>
)

export default MyListings
