import { PageNotFound } from 'pages'
import { useState, useEffect } from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { FaCheck } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useHomesStore } from 'store'
import { useAuthStore } from 'store' // auth store for current user
import { ImageViewer } from './components'
import deleteComment from 'api/comments/delete comment'
import toast from 'react-hot-toast'           // import toast for notifications

const HomePreview: React.FC = () => {
  // Read the `id` param from the URL to determine which home to show
  const { id } = useParams()
  const { homes } = useHomesStore()        // retrieve all homes from Zustand
  const { user } = useAuthStore()          // get current user (if any)
  const currentUserId = user?.id

  // State for image carousel index and full‐screen preview
  const [currentImage, setCurrentImage] = useState(0)
  const [previewImage, setPreviewImage] = useState<null | string>(null)

  // Booking date selections
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')

  // Comments list and new comment draft
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')

  // Find the home matching the URL id, show 404 if not found
  const home = id ? homes.find((h) => h.id === Number(id)) : null
  if (!home) return <PageNotFound />

  const {
    title,
    price,
    type,
    square,
    country,
    class: homeClass,
    description,
    images,
    user: { username, email, avatar },
  } = home

  // Fetch existing comments for this home on mount / when home changes
  useEffect(() => {
    if (!home) return
    fetch(`http://localhost:4000/homes/${home.id}/comments`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setComments(data.comments)
        }
      })
      .catch((err) => console.error('Error fetching comments:', err))
  }, [home])

  // Post a new comment via API
  const handleCreateComment = async () => {
    if (!newComment.trim()) return

    // Show error if not logged in
    if (!currentUserId) {
      toast.error('You must be logged in to leave a comment')
      return
    }

    try {
      const res = await fetch(`http://localhost:4000/homes/${home.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          home_id: home.id,
          user_id: currentUserId,
          text: newComment,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setComments((prev) => [...prev, data.comment]) // append new comment
        setNewComment('')                              // clear textarea
        toast.success('Comment posted successfully')    // feedback toast
      } else {
        toast.error(data.message || 'Failed to post comment')
      }
    } catch (err) {
      console.error('Error creating comment:', err)
      toast.error('An error occurred while posting comment')
    }
  }

  // Delete a comment and update UI
  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId)
      setComments((prev) => prev.filter((c) => c.id !== commentId)) // remove deleted
      toast.success('Comment deleted')
    } catch (error) {
      console.error('Error deleting comment:', error)
      toast.error('Failed to delete comment')
    }
  }

  // Navigate through images in the carousel
  const prevImage = () =>
    setCurrentImage(currentImage > 0 ? currentImage - 1 : images.length - 1)
  const nextImage = () =>
    setCurrentImage(currentImage < images.length - 1 ? currentImage + 1 : 0)

  // Compute and render total booking price based on selected dates
  const renderPriceInfo = () => {
    if (!checkIn || !checkOut) {
      return (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select check-in and check-out dates to see total
        </p>
      )
    }
    const inDate = new Date(checkIn)
    const outDate = new Date(checkOut)
    const diffInMs = outDate.getTime() - inDate.getTime()
    const oneDayMs = 1000 * 60 * 60 * 24
    const totalDays = Math.max(1, Math.round(diffInMs / oneDayMs) + 1)
    const nights = Math.max(1, totalDays - 1)
    const totalPrice = nights * price

    return (
      <>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          {totalDays} day(s), {nights} night(s)
        </p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
          Total: ${totalPrice.toLocaleString()}
        </p>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-150 dark:bg-black py-12 px-4">
       <div className="mx-auto max-w-6xl bg-white/70 dark:bg-gray-800 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-[28px] shadow-xl p-8 transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* left column: image gallery */}
          <div>
            <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden rounded-lg shadow-md">
              {images.length > 0 && (
                <>
                  {/* Main image — clicking opens full-screen preview */}
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
            {/* Thumbnail strip for quick navigation */}
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              {images.map((image, index) => (
                <img
                  key={image.originalName || index}
                  src={image.url}
                  className={`w-20 h-20 rounded-lg cursor-pointer object-cover transition-transform hover:scale-105 ${
                    index === currentImage ? 'border-4 border-blue-500' : ''
                  }`}
                  onClick={() => setCurrentImage(index)}
                  alt="Thumbnail"
                />
              ))}
            </div>
          </div>

          {/* right column: details & booking */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {title || 'Home'}
              </h2>
              <p className="text-xl text-green-600 dark:text-green-400 font-semibold mt-2">
                ${price.toLocaleString()}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500 text-3xl">★★★★☆</span>
                <span className="ml-3 text-xl text-gray-600 dark:text-gray-300">
                  4.7 / 5
                </span>
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
                <p className="font-medium">
                  🏢 Type: <span className="font-semibold">{type}</span>
                </p>
              </div>
            </div>

            {/* booking form */}
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
                    className="border rounded-md px-2 py-1
                      bg-white text-gray-900
                      dark:bg-gray-700 dark:text-gray-100
                      focus:ring-2 focus:ring-blue-500"
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
                    className="border rounded-md px-2 py-1
                      bg-white text-gray-900
                      dark:bg-gray-700 dark:text-gray-100
                      focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4">{renderPriceInfo()}</div>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Reservate
              </button>
            </div>
          </div>
        </div>

        {/* description section */}
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Description</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
          </div>

          {/* amenities */}
          <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Amenities</h3>
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

          {/* host info */}
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

          {/* map iframe */}
          <div className="p-4 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Location</h3>
            <iframe
              title="Location"
              src="https://maps.google.com/maps?q=Manhattan,NYC&z=13&output=embed"
              width="100%"
              height="300"
              allowFullScreen
              loading="lazy"
              className="rounded-md"
            />
          </div>
        </div>

        {/* comments section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Comments</h3>
          {comments.map((c) => (
            <div
              key={c.id}
              className="border p-3 mb-2 rounded-md bg-gray-50 dark:bg-gray-700"
            >
              <p className="text-gray-800 dark:text-gray-200">{c.text}</p>
              <small className="text-gray-400">{`Comment #${c.id}`}</small>
              {c.user_id === currentUserId && (
                <button
                  onClick={() => handleDeleteComment(c.id)}
                  className="float-right bg-red-500 text-white px-2 py-1 rounded-md ml-2"
                >
                  Delete
                </button>
              )}
            </div>
          ))}

          {/* new comment textarea */}
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="border w-full p-2 rounded
                bg-white text-gray-900
                dark:bg-gray-700 dark:text-gray-100
                focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              onClick={handleCreateComment}
              className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700 transition"
            >
              Add Comment
            </button>
          </div>
        </div>
      </div>

      {/* full-screen preview overlay */}
      {previewImage && (
        <ImageViewer image={previewImage} exit={() => setPreviewImage(null)} />
      )}
    </div>
  )
}

export default HomePreview
