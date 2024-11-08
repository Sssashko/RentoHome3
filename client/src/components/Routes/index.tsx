import { CarPreview, CreateListing, Listings, LogIn, MyListings, PageNotFound, SignUp, ProfilePage } from 'pages'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => (
	<Routes>
		<Route path="/">
			<Route index element={<Listings />} />
			<Route path=":id" element={<CarPreview />} />
		</Route>

		<Route path="/login" element={<LogIn />} />
		<Route path="/signup" element={<SignUp />} />

		<Route path="/mylistings" element={<MyListings />} />
		<Route path="/listcar" element={<CreateListing />} />
		<Route path="/ProfilePage" element={<ProfilePage avatarUrl='' bio='' followers={1} following={1} name='' posts={1}  />} />
		<Route path="/*" element={<PageNotFound />} />

	</Routes>
)

export default AppRoutes