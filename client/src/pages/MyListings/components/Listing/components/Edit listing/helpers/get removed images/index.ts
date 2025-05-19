import { Image } from 'types'

// given the current images array (mix of File | Image) and original Image[]
// return array of URLs that were removed by the user
const getRemovedImages = (
  images: (Image | File)[],
  initialImages: Image[]
) => {
  const removed = initialImages.filter(
    img => !images.find(i => !(i instanceof File) && i.url === img.url)
  )
  // return full URLs for backend to delete
  return removed.map(({ url }) => url)
}

export default getRemovedImages
