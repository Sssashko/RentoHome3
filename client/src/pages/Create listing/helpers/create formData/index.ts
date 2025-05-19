import { Image } from 'types'

interface Payload {
  country: string
  class: string
  square: string
  title: string
  price: number
  description: string
}

/**
 * Build FormData for a new home listing.
 * - Serializes the payload as JSON under "home"
 * - Appends each File under the "image" key
 */
  const createFormData = (data: Payload, images: (Image | File)[]) => {
  const formData = new FormData()

  // attach the home object as a JSON string
  formData.append('home', JSON.stringify(data))

  // append each image file (ignore existing URLs)
  images.forEach((item) => {
    if (item instanceof File) {
      formData.append('image', item)
    }
  })

  return formData
}

export default createFormData
