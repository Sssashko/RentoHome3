import { HomePreview, CreateListing, Listings, LogIn, MyListings, PageNotFound, SignUp, ProfilePage, LandingPage, AboutUs, Support } from 'pages'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => (
	<Routes>
		<Route path="/">
			<Route path="/listings" element={<Listings />} />
			<Route path=":id" element={<HomePreview />} />
		</Route>

		<Route index element={<LandingPage />} />
		<Route path="/login" element={<LogIn />} />
		<Route path="/signup" element={<SignUp />} />

		<Route path="/mylistings" element={<MyListings />} />
		<Route path="/listhome" element={<CreateListing />} />
		<Route path="/ProfilePage" element={<ProfilePage/>} />
		<Route path="/aboutus" element={<AboutUs />} />
		<Route path="/support" element={<Support />} />
		<Route path="/*" element={<PageNotFound />} />

	</Routes>
)

export default AppRoutes