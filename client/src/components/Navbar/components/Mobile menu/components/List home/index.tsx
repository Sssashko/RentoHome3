import { FaHome } from "react-icons/fa"
import { NavLink } from 'react-router-dom'

const ListHome = () => (
  // Link that navigates to the page for listing a new home
  <NavLink to="/listhomes" className="mt-1 flex items-center gap-2">
    {/* Home icon */}
    <FaHome size={35} color="white" />
    {/* Button label */}
    <h2 className="text-xl font-semibold">List home</h2>
  </NavLink>
)

export default ListHome
