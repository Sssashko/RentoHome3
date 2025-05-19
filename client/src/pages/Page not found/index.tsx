import { NavLink } from 'react-router-dom'

// Fallback component when no matching route is found
const PageNotFound = () => (
  <div className="m-auto text-white">
    {/* main message */}
    <h1 className="text-4xl font-semibold">Page is not found!</h1>
    {/* link back to home */}
    <NavLink
      to="/"
      className="mx-auto mt-8 block w-fit rounded bg-green-600 px-6 py-1 text-lg font-semibold transition duration-200 hover:bg-opacity-80"
    >
      Home
    </NavLink>
  </div>
)

export default PageNotFound
