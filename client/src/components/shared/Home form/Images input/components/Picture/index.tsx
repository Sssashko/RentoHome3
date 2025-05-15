import { Transition } from '@headlessui/react'
import { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { Image } from 'types'

interface Props {
  image: File | Image
  removeImage: () => void
}

/**
 * Displays a single image thumbnail.
 * - Shows full-size image.
 * - On hover, overlays with filename and a delete icon.
 * - Clicking the delete icon calls removeImage().
 */
const Picture = ({ image, removeImage }: Props) => {
  const [isHovering, setIsHovering] = useState(false)  // track hover state

  // If it's a File, create a temporary URL; otherwise use Image.url
  const source = image instanceof File ? URL.createObjectURL(image) : image.url
  // Use file name or originalName from API
  const originalName = image instanceof File ? image.name : image.originalName

  return (
    <div
      className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovering(true)}   // show overlay
      onMouseLeave={() => setIsHovering(false)}  // hide overlay
    >
      {/* actual image */}
      <img src={source} className="h-full w-full object-cover" />

      {/* overlay appears with fade in/out */}
      <Transition
        show={isHovering}
        className="absolute left-0 top-0 h-full w-full bg-neutral-900 transition duration-200"
        enterFrom="opacity-0 pointer-events-none"
        leaveTo="opacity-0 pointer-events-none"
      >
        <div className="flex h-full w-full flex-col justify-center">
          {/* display truncated filename */}
          <h3 className="mx-auto text-sm font-semibold md:text-lg">
            {originalName.length <= 10
              ? originalName
              : originalName.slice(0, 10) + '...'}
          </h3>
          {/* delete icon */}
          <AiOutlineCloseCircle
            className="mx-auto mt-1/2 h-2/5 w-2/5 text-red-500"
            onClick={removeImage}  // trigger removal callback
          />
        </div>
      </Transition>
    </div>
  )
}

export default Picture
