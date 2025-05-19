// ImageViewer.tsx
import { useEffect, useRef, useState } from 'react'
import { CgCloseR } from 'react-icons/cg'
import { Portal } from 'components/ui'

interface Props {
  image: string       // URL of the image to display
  exit: () => void    // callback to close the viewer
}

const ImageViewer = ({ image, exit }: Props) => {
  const [isBigEnough, setIsBigEnough] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // on mount and on window resize, check if image height >= container height
    const handleResize = () => {
      const container = containerRef.current
      const img = imageRef.current
      if (container && img && img.clientHeight >= container.clientHeight) {
        setIsBigEnough(true)
      } else {
        setIsBigEnough(false)
      }
    }

    handleResize()                          // initial size check
    document.body.classList.add('overflow-hidden')  // lock background scroll
    window.addEventListener('resize', handleResize)

    return () => {
      document.body.classList.remove('overflow-hidden')
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Portal>
      <div
        ref={containerRef}
        className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center overflow-auto bg-black"
      >
        {/* full-screen image; add top margin if it's shorter than viewport */}
        <img
          src={image}
          ref={imageRef}
          className={`w-full ${!isBigEnough ? 'mt-16' : ''}`}
        />

        {/* show close icon if image fills viewport, otherwise show a button */}
        {isBigEnough ? (
          <CgCloseR
            size={50}
            color="white"
            onClick={exit}
            className="fixed right-8 top-3"
          />
        ) : (
          <button
            className="my-4 rounded border bg-neutral-900 px-4 py-0.5 text-lg font-medium text-white hover:bg-neutral-800 transition"
            onClick={exit}
          >
            Close
          </button>
        )}
      </div>
    </Portal>
  )
}

export default ImageViewer
