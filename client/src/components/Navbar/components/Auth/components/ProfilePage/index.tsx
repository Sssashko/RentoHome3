import { Menu } from '@headlessui/react'
import { CgProfile } from "react-icons/cg";
import { NavLink } from 'react-router-dom'


const MyListings = () => (
	<Menu.Item>
		<NavLink
			to="/ProfilePage"
			className="my-0.5 flex cursor-pointer items-center gap-2 px-6 py-px hover:bg-neutral-500"
		>
			<CgProfile size={25} color="white" />
			<h2 className="text-lg font-semibold">Profile Page</h2>
		</NavLink>
	</Menu.Item>
)

export default MyListings
