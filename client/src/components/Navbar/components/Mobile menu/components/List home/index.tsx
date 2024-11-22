import { FaHome } from "react-icons/fa";
import { NavLink } from 'react-router-dom'

const ListHome = () => (
	<NavLink to="/listhomes" className="mt-1 flex items-center gap-2">
		<FaHome size={35} color="white" />
		<h2 className="text-xl font-semibold">List home</h2>
	</NavLink>
)

export default ListHome
