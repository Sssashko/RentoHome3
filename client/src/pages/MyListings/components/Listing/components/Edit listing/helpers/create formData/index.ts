// Payload describes the core home data (excluding image files) 
// that will be serialized (konvertēts uz JSON virkni) and sent in the multipart/form-data request.
// It includes all required fields for creating or updating a listing.
interface Payload {
	id: number
	title: string
	square: string
	price: number
	class: string
	country: string
	description: string
  }
  
  const createFormData = (
	data: Payload,
	images: File[],
	removedImages: string[]
  ) => {
	const formData = new FormData()
  
	// serialize home fields as JSON under “home”
	formData.append('home', JSON.stringify(data))
  
	// append each new image file
	images.forEach(file => {
	  formData.append('image', file)
	})
  
	// serialize URLs of images to delete
	formData.append('removedImages', JSON.stringify(removedImages))
  
	// --- DEBUG: log FormData entries in console ---
	console.log('=== Debug FormData ===')
	for (const [key, value] of formData.entries()) {
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
  