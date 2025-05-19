import { Transition } from '@headlessui/react'
import { deleteHomeQuery } from 'api/homes'
import { useCreateProtectedRequest } from 'hooks'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useHomesStore } from 'store'
import { Image } from 'types'

import { DeleteButton, EditButton } from './components'

interface Props {
  id: number                                   // unique identifier of the home
  image: Image                                 // the Image object to display in preview
  setEditHome: Dispatch<SetStateAction<boolean>> // setter to open/close the edit modal
}

const Preview = ({ id, image, setEditHome }: Props) => {
  const createProtectedRequest = useCreateProtectedRequest() // wraps API calls with auth
  const { removeHome } = useHomesStore()                     // action to remove home from store

  // hover = show overlay; confirmDelete = show confirmation dialog; deleting = disable UI
  const [hover, setHover] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isBeingDeleted, setIsBeingDeleted] = useState(false)

  // prepare delete request that also updates global store on success
  const deleteHome = createProtectedRequest({
    requestQuery: async () => await deleteHomeQuery(id),
    callback: () => removeHome(id)
  })

  // when deleting, disable further pointer events
  const pointerEvents = isBeingDeleted ? 'pointer-events-none' : 'pointer-events-auto'

  return (
    <div
      className={`relative aspect-video w-full ${pointerEvents}`}
      onMouseEnter={() => setHover(true)}    // show overlay on hover
      onMouseLeave={() => setHover(false)}   // hide overlay when not hovering
    >
      {/* display the home image */}
      <img
        src={image.url}
        className="absolute aspect-video w-full rounded-t-lg object-cover"
        alt="Home preview"
      />

      {/* main overlay that appears on hover */}
      <Transition
        show={hover}
        className="absolute flex h-full w-full items-center justify-center rounded-t-lg bg-black bg-opacity-70 transition duration-200"
        enterFrom="opacity-0"
        leaveTo="pointer-events-none opacity-0"
      >
        {/* nested overlay for delete confirmation */}
        <Transition
          show={showDeleteConfirm}
          className="absolute flex h-full w-full flex-col items-center justify-center rounded-t-lg bg-black bg-opacity-30 transition duration-200"
          enterFrom="opacity-0"
          leaveTo="pointer-events-none opacity-0"
        >
          {/* confirmation message */}
          <h1 className="mx-auto w-56 text-center font-semibold text-white">
            Are you sure you want to delete this listing?
          </h1>

          {/* Yes/No buttons */}
          <div className="mx-auto mt-4 flex w-fit gap-8">
            {/* confirm deletion */}
            <button
              className="rounded-md bg-green-600 px-4 py-1 text-sm font-semibold transition duration-200 hover:scale-105"
              onClick={async () => {
                setIsBeingDeleted(true)  // disable UI while deleting
                await toast.promise(deleteHome(), {
                  loading: 'Removing listing...',
                  success: 'Home has been deleted',
                  error: 'Error while deleting listing'
                })
                setIsBeingDeleted(false)
              }}
            >
              Yes
            </button>

            {/* cancel deletion */}
            <button
              className="rounded-md bg-red-500 px-4 py-1 text-sm font-semibold transition duration-200 hover:scale-105"
              onClick={() => setShowDeleteConfirm(false)}
            >
              No
            </button>
          </div>
        </Transition>

        {/* default overlay with edit & delete icons */}
        <Transition
          show={!showDeleteConfirm}
          className="absolute flex items-center justify-center gap-3 transition duration-200"
          enterFrom="opacity-0"
          leaveTo="pointer-events-none opacity-0"
        >
          {/* open the edit modal */}
          <EditButton onClick={() => setEditHome(true)} />
          {/* show delete confirmation dialog */}
          <DeleteButton onClick={() => setShowDeleteConfirm(true)} />
        </Transition>
      </Transition>
    </div>
  )
}

export default Preview
