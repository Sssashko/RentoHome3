import { Image } from 'types'

interface Payload {
	country: string
	class: string
	square: string
	year: number
	price: number
	description: string
}

const createFormData = (data: Payload, images: (Image | File)[]) => {
	const formData = new FormData()
	formData.append('home', JSON.stringify(data))

	images.forEach((item) => {
		if (item instanceof File) {
			formData.append(`image`, item)
		}
	})

	return formData
}

export default createFormData
