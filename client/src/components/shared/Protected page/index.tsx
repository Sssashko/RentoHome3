import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthStore } from 'store'

interface Props {
	children: ReactNode // content to show if user is logged in
}

/**
 * Wraps pages that require authentication.
 * If user is not logged in, shows a prompt to sign in.
 */
const ProtectedPage = ({ children }: Props) => {
	const { user } = useAuthStore() // get current user from global store

	// if user exists, render the protected content
	if (user) {
		return <>{children}</>
	}

	// if no user, show message and link to login page
	return (
		<div className="m-auto text-white">
			<h1 className="text-center text-2xl font-semibold">
				This page is protected. <br className="sm:hidden" /> Sign in to view content
			</h1>
			<NavLink to="/login">
				<button className="m-auto mt-8 block rounded-md bg-green-600 px-6 py-1 text-lg font-bold transition duration-200 hover:bg-opacity-90">
					Sign In
				</button>
			</NavLink>
		</div>
	)
}

export default ProtectedPage
