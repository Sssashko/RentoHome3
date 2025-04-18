interface Payload {
	id: number
	title: string
	square: string
	price: number
	class: string
	country: string
	description: string
}

const createFormData = (data: Payload, images: File[], removedImages: string[]) => {
	const formData = new FormData()

	formData.append('home', JSON.stringify(data))

	images.forEach((file) => {
		formData.append('image', file);
	})

	formData.append('removedImages', JSON.stringify(removedImages))

	  // --- ДЛЯ ОТЛАДКИ: Посмотреть, что реально в FormData ---
  console.log('=== Debug FormData ===')
  for (const [key, value] of formData.entries()) {
    // Если value — File, посмотреть его имя:
    if (value instanceof File) {
      console.log(key, 'File:', value.name)
    } else {
      console.log(key, value)
    }
  }
  console.log('=== End Debug FormData ===')

	return formData
}

export default createFormData
