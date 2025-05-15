import { BiLogInCircle } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'

const SignIn = () => (
  // Link to the login page
  <NavLink to="/login" className="mt-1 flex items-center gap-2">
    {/* Icon for sign in */}
    <BiLogInCircle size={35} color="white" />
    {/* Button label */}
    <h2 className="text-xl font-semibold">Sign in</h2>
  </NavLink>
)

export default SignIn
