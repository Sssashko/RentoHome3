import { useAuthStore, useHomesStore } from 'store'
import { ProtectedPage } from 'components/shared'
import { Listing } from './components'

const MyListings = () => {
  const { homes } = useHomesStore()   // all homes from global store
  const { user } = useAuthStore()     // current logged-in user

  // filter to homes created by current user
  const myListings = homes.filter(({ user: seller }) => seller.id === user?.id)

  return (
    <ProtectedPage>
      {/* wrap listings in flex container */}
      <div className="flex flex-wrap bg-gray-150 justify-center gap-5 p-8 dark:bg-gray-900">
        {myListings.map(home => (
          <Listing {...home} key={home.id} />
        ))}
      </div>
    </ProtectedPage>
  )
}

export default MyListings
