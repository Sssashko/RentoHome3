import googleIcon from 'assets/google.png' // Google logo image
import { GOOGLE_AUTH } from 'config'        // URL for Google OAuth redirect
import { NavLink } from 'react-router-dom'  // React Router link component

const GoogleSignIn = () => (
  // Link that sends the user to the Google OAuth endpoint
  <NavLink
    to={GOOGLE_AUTH}
    className="
      mx-auto flex w-fit cursor-pointer items-center gap-5
      rounded-lg border-2 border-neutral-500
      px-6 py-2 transition duration-200
      hover:bg-neutral-500 hover:bg-opacity-20
    "
  >
    {/* Display the Google icon */}
    <img src={googleIcon} alt="Google Logo" className="h-8 w-8" />
    {/* Button text */}
    <h3 className="font-semibold">Sign in with Google</h3>
  </NavLink>
)

export default GoogleSignIn // Export as default for easy import elsewhere
