import { PageNotFound } from 'pages';
import { useState } from 'react';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import { useHomesStore } from 'store';
import { ImageViewer } from './components';

const HomePreview = () => {
	const { id } = useParams();
	const { homes } = useHomesStore();

	const [currentImage, setCurrentImage] = useState(0);
	const [previewImage, setPreviewImage] = useState<null | string>(null);

	const home = id ? homes.find((home) => home.id === Number(id)) : null;
	if (!home) return <PageNotFound />;

	const {
		title,
		price,
		square,
		country,
		class: homeClass,
		description,
		images,
		user: { username, email, avatar }
	} = home;

	const prevImage = () => setCurrentImage(currentImage > 0 ? currentImage - 1 : images.length - 1);
	const nextImage = () => setCurrentImage(currentImage < images.length - 1 ? currentImage + 1 : 0);

	return (
		<>
			<div className="mx-auto my-10 max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
				{/* Карусель изображений */}
				<div className="relative">
					{images.length > 0 && (
						<div className="relative w-full overflow-hidden rounded-lg shadow-md">
							<img
								src={images[currentImage].url}
								onClick={() => setPreviewImage(images[currentImage].url)}
								className="w-full h-80 object-cover cursor-pointer transition-transform transform hover:scale-105"
								alt="Home Image"
							/>
							<FcPrevious
								size={40}
								className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
								onClick={prevImage}
							/>
							<FcNext
								size={40}
								className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-white p-2 rounded-full shadow-lg hover:scale-110 transition"
								onClick={nextImage}
							/>
						</div>
					)}
				</div>

				{/* Основная информация */}
				<div className="mt-6">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title || 'Home'}</h2>
					<p className="text-xl text-green-600 dark:text-green-400 font-semibold mt-2">
						${price.toLocaleString()}
					</p>
				</div>

				{/* Детали дома */}
				<div className="mt-6 grid grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
					<p className="font-medium">
						🏡 Class: <span className="font-semibold">{homeClass}</span>
					</p>
					<p className="font-medium">
						📍 Country: <span className="font-semibold">{country}</span>
					</p>
					<p className="font-medium">
						📏 Square: <span className="font-semibold">{square} m²</span>
					</p>
				</div>

				{/* Описание */}
				<div className="mt-6">
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white">Description</h3>
					<p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
				</div>

				{/* Галерея миниатюр */}
				<div className="mt-6 flex flex-wrap gap-3 justify-center">
					{images.map((image, index) => (
						<img
							src={image.url}
							className={`w-24 h-24 rounded-lg cursor-pointer object-cover transition-transform hover:scale-105 ${
								index === currentImage ? 'border-4 border-blue-500' : ''
							}`}
							onClick={() => setCurrentImage(index)}
							key={image.originalName || index}
							alt="Thumbnail"
						/>
					))}
				</div>

				{/* Информация о владельце */}
				<div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-4 shadow-md">
					<img src={avatar} className="h-14 w-14 rounded-full object-cover" alt="User Avatar" />
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{username}</h3>
						<p className="text-sm text-gray-500 dark:text-gray-300">
							📧 Email: <span className="text-gray-800 dark:text-white">{email}</span>
						</p>
					</div>
				</div>
			</div>

			{/* Просмотр изображения в полноэкранном режиме */}
			{previewImage && <ImageViewer image={previewImage} exit={() => setPreviewImage(null)} />}
		</>
	);
};

export default HomePreview;
