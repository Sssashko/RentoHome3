import React, { useState, useEffect, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import toast from 'react-hot-toast'
import useFilteredHomes from 'hooks/useFilteredHomes'
import { likeHomeQuery } from 'api/homes'
import fetchUserLikes from 'api/homes/fetch likes'
import { useAuthStore } from 'store'
import { Home } from 'types'

const Homes: React.FC = () => {
  // get filtered homes from custom hook
  const homes = useFilteredHomes()
  const [localHomes, setLocalHomes] = useState<Home[]>(homes)
  const [likedIds, setLikedIds] = useState<number[]>([])
  const { user } = useAuthStore()
  const currentUserId = user?.id

  // update localHomes when filters change
  useEffect(() => {
    setLocalHomes(homes)
  }, [homes])

  // fetch liked home IDs for the current user
  useEffect(() => {
    if (!currentUserId) return
    ;(async () => {
      try {
        const resp = await fetchUserLikes(currentUserId)
        if (resp.success && Array.isArray(resp.likes)) {
          setLikedIds(Array.from(new Set(resp.likes)))
        }
      } catch {
        toast.error('Error loading likes')
      }
    })()
  }, [currentUserId])

  // sort homes by likes descending
  const sortedHomes = useMemo(
    () => [...localHomes].sort((a, b) => b.likes - a.likes),
    [localHomes]
  )

  // get ranking (TOP 1–3) based on sorted position
  const getRank = (id: number) => {
    const idx = sortedHomes.findIndex(h => h.id === id)
    return idx >= 0 && idx < 3 ? idx + 1 : null
  }

  // toggle like on a home
  const handleLike = async (homeId: number) => {
    const isLiked = likedIds.includes(homeId)
    try {
      const updatedHome = await likeHomeQuery(homeId)
      if (isLiked) {
        toast('Like removed!', { icon: '👎' })
        setLikedIds(ids => ids.filter(i => i !== homeId))
      } else {
        toast.success('Liked!')
        setLikedIds(ids => [...ids, homeId])
      }
      // update like count locally
      setLocalHomes(prev =>
        prev.map(h => (h.id === homeId ? { ...h, likes: updatedHome.likes } : h))
      )
    } catch {
      toast.error('Error toggling like')
    }
  }

  if (!localHomes.length) {
    return (
      <h1 className="mx-auto mt-10 p-4 text-center text-2xl font-bold text-gray-800 dark:text-white">
        No homes matching your queries found!
      </h1>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 mt-6">
      {localHomes.map(home => {
        const { id, title, price, images, square, country, class: homeClass, type, likes } = home
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
        const rank = getRank(id)

        return (
          <NavLink
            key={id}
            to={`/${id}`}
            className="relative block w-full h-auto min-h-[280px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 bg-white dark:bg-gray-800"
          >
            <div className="relative">
              <img
                src={images[0]?.url || '/default-home.jpg'}
                alt={title}
                className="w-full h-52 object-cover transition-transform duration-500"
              />
              {rank && (
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-md shadow-md">
                  TOP {rank}
                </span>
              )}
              <button
                onClick={e => {
                  e.preventDefault() // prevent navigation
                  if (!currentUserId) {
                    toast.error('Please log in to like!')
                    return
                  }
                  handleLike(id)
                }}
                className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 bg-white bg-opacity-75 rounded-full hover:bg-opacity-100 transition"
              >
                <FaHeart
                  size={22}
                  className={`${
                    likedIds.includes(id)
                      ? 'text-red-600'
                      : 'text-gray-300 hover:text-red-600'
                  }`}
                />
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full">
                  {likes}
                </span>
              </button>
            </div>
            <div className="p-3 space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-md text-gray-700 dark:text-gray-400">
                {country} • {homeClass}
              </p>
              <div className="flex justify-between text-md text-gray-700 dark:text-gray-400">
                <p>Area: {square} m²</p>
                <p>🏠 {type}</p>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formattedPrice}$ / night
              </p>
            </div>
          </NavLink>
        )
      })}
    </div>
  )
}

export default Homes
