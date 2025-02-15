import { PageNotFound } from 'pages'
import { useState, useEffect } from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { FaCheck } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useHomesStore } from 'store'
import { ImageViewer } from './components'

const HomePreview = () => {
  const { id } = useParams();
  const { homes } = useHomesStore();

  const [currentImage, setCurrentImage] = useState(0);
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // --- НОВОЕ: Состояние для комментариев
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  // Ищем дом по id
  const home = id ? homes.find((h) => h.id === Number(id)) : null;
  if (!home) return <PageNotFound />;

  const {
    title,
    price,
    square,
    country,
    class: homeClass,
    description,
    images,
    user: { username, email, avatar },
  } = home;

  // --- НОВОЕ: Загружаем комментарии при загрузке компонента
  useEffect(() => {
    if (!home) return;
    fetch(`http://localhost:4000/homes/${home.id}/comments`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setComments(data.comments);
        }
      })
      .catch(err => console.error('Error fetching comments:', err));
  }, [home]);
  

  // --- НОВОЕ: Функция для отправки нового комментария
  const handleCreateComment = async () => {
    if (!newComment.trim()) return;
    const res = await fetch(`http://localhost:4000/homes/${home.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newComment })
    });
    const data = await res.json();
    if (data.success) {
      setComments((prev) => [...prev, data.comment]);
      setNewComment('');
    }
  };
  

  // Кнопки переключения картинок
  const prevImage = () =>
    setCurrentImage(currentImage > 0 ? currentImage - 1 : images.length - 1);

  const nextImage = () =>
    setCurrentImage(currentImage < images.length - 1 ? currentImage + 1 : 0);

  // Расчёт цены
  const renderPriceInfo = () => {
    if (!checkIn || !checkOut) {
      return (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select check-in and check-out dates to see total
        </p>
      );
    }

    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffInMs = outDate.getTime() - inDate.getTime();
    const oneDayMs = 1000 * 60 * 60 * 24;

    const totalDays = Math.max(1, Math.round(diffInMs / oneDayMs) + 1);
    const nights = Math.max(1, totalDays - 1);
    const totalPrice = nights * price;

    return (
      <>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {totalDays} день(дней), {nights} ночь(ночей)
        </p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
          Total: ${totalPrice.toLocaleString()}
        </p>
      </>
    );
  };

  return (
    <div className="flex justify-center my-10">
      <div className="w-full max-w-[1200px] bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        
        {/* Верхний блок: 2 колонки (картинка слева, параметры/бронирование справа) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Левая колонка — большая картинка и миниатюры */}
          <div>
            <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden rounded-lg shadow-md">
              {images.length > 0 && (
                <>
                  <img
                    src={images[currentImage].url}
                    onClick={() => setPreviewImage(images[currentImage].url)}
                    className="w-full h-full object-cover cursor-pointer transition-transform hover:scale-105"
                    alt="Home"
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
                </>
              )}
            </div>

            {/* Галерея миниатюр */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {images.map((image, index) => (
                <img
                  src={image.url}
                  key={image.originalName || index}
                  className={`w-20 h-20 rounded-lg cursor-pointer object-cover transition-transform hover:scale-105 ${
                    index === currentImage ? 'border-4 border-blue-500' : ''
                  }`}
                  onClick={() => setCurrentImage(index)}
                  alt="Thumbnail"
                />
              ))}
            </div>
          </div>

          {/* Правая колонка — основные параметры, рейтинг, booking */}
          <div className="flex flex-col justify-between">
            {/* Заголовок, цена, рейтинг */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {title || 'Home'}
              </h2>
              <p className="text-xl text-green-600 dark:text-green-400 font-semibold mt-2">
                ${price.toLocaleString()}
              </p>
              {/* Рейтинг */}
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-3xl">★★★★☆</span>
                <span className="ml-3 text-xl text-gray-600 dark:text-gray-300">4.7 / 5</span>
              </div>
              <div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
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
            </div>

            {/* Бронирование */}
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Booking Dates
              </h3>
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                    Check-In
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="border rounded-md px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="border rounded-md px-2 py-1"
                  />
                </div>
              </div>
              <div className="mt-4">{renderPriceInfo()}</div>

              {/* Кнопка "Reserve" */}
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Reservate
              </button>
            </div>
          </div>
        </div>

        {/* Нижний блок: Описание, Удобства, Информация о владельце, Карта */}
        <div className="mt-8 space-y-6">
          {/* Описание */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Description</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
          </div>

          {/* Удобства */}
          <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                <span>Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                <span>Air conditioning</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                <span>Parking available</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                <span>Pet-friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                <span>Breakfast included</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-green-500" />
                <span>Free Parking</span>
              </div>
            </div>
          </div>

          {/* Информация о владельце */}
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center gap-4 shadow-md">
            <img
              src={avatar}
              className="h-14 w-14 rounded-full object-cover"
              alt="User Avatar"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{username}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                📧 Email: <span className="text-gray-800 dark:text-white">{email}</span>
              </p>
            </div>
          </div>

          {/* Карта (рандомная локация) */}
          <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Location
            </h3>
            <iframe
              title="Random Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224578.33324004497!2d-74.11808619553954!3d40.705825363980515!2m3!1f0!2f0!
3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2451b8adfac37%3A0x7349aa2bb0251b29!
2sManhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1610145486556!
5m2!1sen!2sus"
              width="100%"
              height="300"
              allowFullScreen
              loading="lazy"
              className="rounded-md"
            />
          </div>
        </div>

        {/* СЕКЦИЯ КОММЕНТАРИЕВ */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Comments</h3>

          {comments.map((c) => (
            <div key={c.id} className="border p-2 mb-2">
              <p className="text-gray-800 dark:text-gray-200">{c.text}</p>
              <small className="text-gray-400">
                {`Comment #${c.id} by user #${c.user_id || ''}`}
              </small>
            </div>
          ))}

          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border w-full p-2"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleCreateComment}
              className="bg-blue-600 text-white px-4 py-2 mt-2"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>

      {/* Просмотр изображения в полноэкранном режиме */}
      {previewImage && <ImageViewer image={previewImage} exit={() => setPreviewImage(null)} />}
    </div>
  );
};

export default HomePreview;
