import { useState } from 'react'
import { Home } from 'types'
import { Portal } from 'components/ui'
import { EditListing, Preview } from './components'

const Listing = (home: Home) => {
  const [editHome, setEditHome] = useState(false)  // open/close edit modal
  const { id, title, price, images } = home

  return (
    <>
      {/* card container */}
      <div
        className="relative w-full max-w-[370px] rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white shadow-lg overflow-hidden transition-transform hover:scale-105"
        key={images[0].originalName}
      >
        {/* image & overlay preview */}
        <Preview id={id} image={images[0]} setEditHome={setEditHome} />

        {/* basic info */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            {/* truncated title */}
            <h2 className="text-xl font-semibold truncate">{title}</h2>
            {/* formatted price */}
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            </h2>
          </div>
        </div>
      </div>

      {/* edit modal rendered via Portal */}
      {editHome && (
        <Portal>
          <EditListing {...home} closeModal={() => setEditHome(false)} />
        </Portal>
      )}
    </>
  )
}

export default Listing
