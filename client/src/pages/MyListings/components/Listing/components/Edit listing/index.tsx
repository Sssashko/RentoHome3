import { updateHomeQuery } from 'api/homes'
import { useCreateProtectedRequest } from 'hooks'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useHomesStore } from 'store'
import { Home, Image, Country, Class, Type } from 'types'

import { ProtectedPage } from 'components/shared'
import {
  ImagesInput,
  TypeSelector,
  CountrySelector,
  ClassSelector
} from 'components/shared/Home form'
import {
  createFormData,
  homeIsModified,
  getRemovedImages
} from './helpers'

import {
  FaHouseUser,
  FaRuler,
  FaMoneyBillWave,
  FaFileAlt,
  FaFlag,
  FaTags
} from 'react-icons/fa'

type FormData = {
  title: string
  square: string
  price: string
  description: string
}

type Props = Home & {
  closeModal: () => void
}

const EditListing = ({ closeModal, ...home }: Props) => {
  const navigate = useNavigate()                       // navigation hook for redirect
  const createProtectedRequest = useCreateProtectedRequest() // wrapper to handle auth
  const { editHome } = useHomesStore()                // Zustand action to update store

  // extract initial values from `home` prop
  const {
    title: initialTitle,
    square: initialSquare,
    class: initialClass,
    country: initialCountry,
    description: initialDescription,
    images: initialImages,
    type: initialType,
    price: initialPrice
  } = home

  // local state for controlled selects and image list
  const [country, setCountry] = useState<Country>(initialCountry)
  const [homeClass, setHomeClass] = useState<Class>(initialClass)
  const [homeType, setHomeType] = useState<Type>(initialType)
  const [images, setImages] = useState<(Image | File)[]>(initialImages ?? [])
  const [imagesError, setImagesError] = useState('')
  const [loading, setLoading] = useState(false)

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onBlur' })

  // prevent background scroll when modal is open
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setImagesError('')   // clear previous image errors

    // validate file size before proceeding
    const tooBig = images.find(
      img => img instanceof File && img.size > 5 * 1024 * 1024
    ) as File | undefined
    if (tooBig) {
      setLoading(false)
      setImagesError(
        `File "${tooBig.name}" is too large. Please upload a file smaller than 5 MB.`
      )
      return
    }

    // merge original home with updated values
    const modifiedHome = {
      ...home,
      ...data,
      title: data.title.trim(),
      price: Number(data.price),
      square: data.square,
      country,
      class: homeClass,
      type: homeType
    }

    // skip request if nothing changed
    if (!homeIsModified(home, { ...modifiedHome, images })) {
      setLoading(false)
      return toast.error('There are no modifications!')
    }

    // separate new files from existing images
    const imageFiles = images.filter(item => item instanceof File) as File[]
    // determine which original URLs were removed
    const removedImages = getRemovedImages(images, initialImages ?? [])
    // build FormData for multipart upload
    const formData = createFormData(modifiedHome, imageFiles, removedImages)

    // send update request and update local store on success
    const updateReq = createProtectedRequest({
      requestQuery: () => updateHomeQuery(formData),
      callback: editHome
    })

    await toast.promise(updateReq(), {
      loading: 'Modifying listing...',
      success: 'Home has been modified',
      error: 'Error while modifying listing'
    })

    setLoading(false)
    closeModal()                      // close modal after success
    setTimeout(() => navigate('/mylistings'), 300) // redirect to listings
  }

  return (
    <ProtectedPage>
      {/* backdrop: semi-transparent dark layer */}
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closeModal}
      >
        {/* modal container; clicks inside won’t close */}
        <div
          className="relative z-50 w-full max-w-3xl px-4 sm:px-6 lg:px-8 max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* header */}
          <h1 className="mt-8 text-center text-3xl font-bold text-white drop-shadow-lg">
            Edit Listing
          </h1>
          <p className="mt-1 text-center text-sm text-gray-200 dark:text-gray-300 drop-shadow">
            Update the details below to modify your property
          </p>

          {/* form wrapper */}
          <div className="mt-8 rounded-lg bg-white px-6 py-8 shadow-md sm:px-10 lg:px-12 dark:bg-gray-800">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Title and Square fields in two-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TITLE input */}
                <div>
                  <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                    <FaHouseUser />
                    Title
                  </label>
                  <input
                    type="text"
                    defaultValue={initialTitle}
                    {...register('title', {
                      required: 'Title is required',
                      minLength: {
                        value: 2,
                        message: 'Title must be at least 2 characters long'
                      },
                      validate: value =>
                        /^\d+$/.test(value)
                          ? 'Title cannot consist only of digits'
                          : true
                    })}
                    className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${
                      errors.title
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* SQUARE input */}
                <div>
                  <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                    <FaRuler />
                    Square Footage
                  </label>
                  <input
                    type="number"
                    defaultValue={initialSquare}
                    {...register('square', {
                      required: 'Square is required',
                      validate: value => {
                        const numeric = Number(value)
                        if (Number.isNaN(numeric)) {
                          return 'Square must be a valid number (no letters)'
                        }
                        if (numeric < 5 || numeric > 100000) {
                          return 'Square must be between 5 and 100000'
                        }
                        return true
                      }
                    })}
                    className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${
                      errors.square
                        ? 'border-red-500'
                        : 'border-gray-300 dark:border-gray-700'
                    }`}
                  />
                  {errors.square && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.square.message}
                    </p>
                  )}
                </div>
              </div>

              {/* TYPE selector */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaTags />
                  Type
                </label>
                <TypeSelector
                  selectedType={homeType}
                  switchType={setHomeType}
                  className="gap-1 mt-2"
                />
              </div>

              {/* COUNTRY selector */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaFlag />
                  Country
                </label>
                <CountrySelector
                  country={country}
                  switchCountry={setCountry}
                  className="gap-1 mt-2"
                />
              </div>

              {/* CLASS selector */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaTags />
                  Class
                </label>
                <ClassSelector
                  selectedClass={homeClass}
                  switchClass={setHomeClass}
                  className="gap-1 mt-2"
                />
              </div>

              {/* PRICE input with CreateListing validation */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaMoneyBillWave />
                  Price ($)
                </label>
                <input
                  type="number"
                  defaultValue={initialPrice}
                  placeholder="e.g. 1000"
                  {...register('price', {
                    required: 'Price is required',
                    validate: v => {
                      const num = Number(v)
                      if (isNaN(num)) return 'Price must be a number'
                      if (num < 1) return 'Price must be at least 1$'
                      if (homeClass === 'Budget' && num > 500)
                        return 'Budget class max is 500$'
                      if (homeClass === 'Medium' && (num < 501 || num > 1000))
                        return 'Medium class between 501$-1000$'
                      if (homeClass === 'Premium') {
                        if (num <= 1001) return 'Premium above 1001$'
                        if (num > 10000000) return 'Premium max 10M$'
                      }
                      return true
                    }
                  })}
                  className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${
                    errors.price
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
                {homeClass === 'Budget' && (
                  <p className="text-xs text-gray-500 mt-1">Budget: $1–500</p>
                )}
                {homeClass === 'Medium' && (
                  <p className="text-xs text-gray-500 mt-1">Medium: $501–1000</p>
                )}
                {homeClass === 'Premium' && (
                  <p className="text-xs text-gray-500 mt-1">Premium: $1001+</p>
                )}
              </div>

              {/* DESCRIPTION textarea */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaFileAlt />
                  Description
                </label>
                <textarea
                  defaultValue={initialDescription}
                  {...register('description', {
                    required: 'Description is required'
                  })}
                  rows={4}
                  className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none ${
                    errors.description
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* IMAGES uploader component */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  Add Images
                </label>
                <ImagesInput images={images} setImages={setImages} />
                {imagesError && (
                  <p className="text-red-500 text-sm mt-1">{imagesError}</p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-8 w-full rounded bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  loading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Modifying...' : 'Edit Listing'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}

export default EditListing
