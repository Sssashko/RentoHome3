import { PageNotFound } from 'pages'
import { useState } from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { useParams } from 'react-router-dom'
import { useHomesStore } from 'store'

import { ImageViewer } from './components'

const HomePreview = () => {
	const { id } = useParams()
	const { homes } = useHomesStore()

	const [currentImage, setCurrentImage] = useState(0)
	const [previewImage, setPreviewImage] = useState<null | string>(null)

	const home = id ? homes.find((home) => home.id === Number(id)) : null

	if (!home) return <PageNotFound />

	const {
		price,
		square,
		country,
		class: homeClass,
		description,
		images,
		user: { username, email, avatar }
	} = home

	const prevImage = () => setCurrentImage(currentImage > 0 ? currentImage - 1 : images.length - 1)
	const nextImage = () => setCurrentImage(currentImage < images.length - 1 ? currentImage + 1 : 0)

	return (
		<>
			<div className="mx-auto my-5 w-full max-w-screen-lg text-white p-6 bg-neutral-800 rounded-lg shadow-lg">
				<div className="relative">
					<FcPrevious
						size={40}
						className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
						onClick={prevImage}
					/>
					{images.length > 0 && (
						<img
							src={images[currentImage].url}
							onClick={() => setPreviewImage(images[currentImage].url)}
							className="w-full rounded-lg object-cover shadow-md cursor-pointer transition-transform transform hover:scale-105"
							alt="Home Image"
						/>
					)}
					<FcNext
						size={40}
						className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
						onClick={nextImage}
					/>
				</div>

				<div className="mt-4 flex justify-between items-center text-2xl font-bold">
					<h3 className="text-green-400">${price.toLocaleString()}</h3>
				</div>

				<div className="mt-3 text-lg font-medium">
					<p className="text-gray-300">Country: <span className="font-semibold">{country}</span></p>
					<p className="text-gray-300">Square Footage: <span className="font-semibold">{square} sq. ft</span></p>
					<p className="text-gray-300">Class: <span className="font-semibold">{homeClass}</span></p>
				</div>

				<div className="mt-5">
					<h3 className="text-xl font-semibold text-gray-200">Description</h3>
					<p className="mt-2 text-gray-400 leading-relaxed">{description}</p>
				</div>

				<div className="mt-6 flex flex-wrap gap-3 justify-center">
					{images.map((image, index) => (
						<img
							src={image.url}
							className={`w-28 md:w-32 rounded-lg cursor-pointer object-cover ${index === currentImage ? 'border-4 border-green-400' : ''}`}
							onClick={() => setCurrentImage(index)}
							key={image.originalName || index}
							alt="Thumbnail"
						/>
					))}
				</div>

				<div className="my-5 p-4 rounded-lg bg-neutral-700 flex items-center gap-4 shadow-md">
					<img src={avatar} className="h-12 w-12 rounded-full object-cover" alt="User Avatar" />
					<div>
						<h3 className="text-lg font-semibold text-white">{username}</h3>
						<h3 className="text-sm text-gray-400">Email: <span className="text-gray-300">{email}</span></h3>
					</div>
				</div>
			</div>

			{previewImage && (
				<ImageViewer image={previewImage} exit={() => setPreviewImage(null)} />
			)}
		</>
	)
}

export default HomePreview
