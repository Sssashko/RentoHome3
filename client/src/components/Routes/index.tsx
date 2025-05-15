import {
  HomePreview,
  CreateListing,
  Listings,
  LogIn,
  MyListings,
  PageNotFound,
  SignUp,
  ProfilePage,
  LandingPage,
  AboutUs,
  Support
} from 'pages'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => (
  <Routes>
    {/* Nested routes under "/" */}
    <Route path="/">
      {/* /listings → show all listings */}
      <Route path="listings" element={<Listings />} />
      {/* /:id → show detail for a single home by its ID */}
      <Route path=":id" element={<HomePreview />} />
    </Route>

    {/* index route "/" → landing page */}
    <Route index element={<LandingPage />} />

    {/* Authentication */}
    <Route path="login" element={<LogIn />} />
    <Route path="signup" element={<SignUp />} />

    {/* User dashboards */}
    <Route path="mylistings" element={<MyListings />} />
    <Route path="listhome" element={<CreateListing />} />
    <Route path="ProfilePage" element={<ProfilePage />} />

    {/* Static pages */}
    <Route path="aboutus" element={<AboutUs />} />
    <Route path="support" element={<Support />} />

    {/* Fallback for any undefined route → 404 */}
    <Route path="*" element={<PageNotFound />} />
  </Routes>
)

export default AppRoutes
