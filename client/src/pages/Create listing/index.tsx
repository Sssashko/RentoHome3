import { createHomeQuery } from 'api/homes'
import { useCreateProtectedRequest } from 'hooks'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useHomesStore } from 'store'
import { Image, Country, Class, Type } from 'types'
import { ProtectedPage } from 'components/shared'
import {
  ImagesInput,
  TypeSelector,
  CountrySelector,
  ClassSelector
} from 'components/shared/Home form'
import { createFormData } from './helpers'
import {
  FaHouseUser,
  FaRuler,
  FaMoneyBillWave,
  FaFileAlt,
  FaFlag,
  FaTags
} from 'react-icons/fa'

// Define the shape of our form data
type FormData = {
  title: string
  square: string    // will convert to number later
  price: string     // will convert to number later
  description: string
}

const CreateListing = () => {
  const navigate = useNavigate()
  const createProtectedRequest = useCreateProtectedRequest()
  const { createHome } = useHomesStore()

  // Local component state
  const [country, setCountry] = useState<Country>('Latvia')
  const [homeClass, setHomeClass] = useState<Class>('Budget')
  const [homeType, setHomeType] = useState<Type>('Apartament')
  const [images, setImages] = useState<(Image | File)[]>([])
  const [imagesError, setImagesError] = useState('')
  const [loading, setLoading] = useState(false)

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ mode: 'onBlur' })

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    // clear previous image errors
    setImagesError('')

    // 1) Require at least one image
    if (!images.length) {
      setImagesError('At least one image is required!')
      return
    }

    // 2) Ensure no image exceeds 5MB
    const tooBig = images.find(
      img => img instanceof File && img.size > 5 * 1024 * 1024
    ) as File | undefined
    if (tooBig) {
      setImagesError(
        `File "${tooBig.name}" is too large. Please upload a file smaller than 5 MB.`
      )
      return
    }

    try {
      setLoading(true)

      // Prepare payload object
      const homeListing = {
        title: data.title.trim(),
        price: Number(data.price),
        square: data.square,
        description: data.description,
        country,
        class: homeClass,
        type: homeType
      }

      // Convert payload + files into FormData
      const formData = createFormData(homeListing, images)

      // Perform protected request and update store on success
      const postHome = createProtectedRequest({
        requestQuery: () => createHomeQuery(formData),
        callback: createHome
      })

      // Show toast notifications for request lifecycle
      await toast.promise(postHome(), {
        loading: 'Creating listing...',
        success: 'Home has been listed',
        error: 'Error while creating listing'
      })

      setLoading(false)
      navigate('/mylistings')
    } catch {
      setLoading(false)
      toast.error('An unexpected error occurred!')
    }
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen w-full bg-gray-150 dark:bg-gray-900 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
            Create New Listing
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
            Fill out the details below to list your property
          </p>

          {/* Form container */}
          <div className="mt-8 rounded-lg bg-white px-6 py-8 shadow-md sm:px-10 lg:px-12 dark:bg-gray-800">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Title & Square inputs side-by-side on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title field */}
                <div>
                  <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                    <FaHouseUser /> Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cozy Apartment"
                    {...register('title', {
                      required: 'Title is required',
                      minLength: { value: 2, message: 'At least 2 characters' },
                      validate: v => (/^\d+$/.test(v) ? 'Cannot be only digits' : true)
                    })}
                    className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2 ${
                      errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                {/* Square footage field */}
                <div>
                  <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                    <FaRuler /> Square Footage
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 80"
                    {...register('square', {
                      required: 'Square is required',
                      validate: v => {
                        const num = Number(v)
                        if (isNaN(num)) return 'Must be a number'
                        if (num < 5 || num > 100000) return 'Must be between 5 and 100,000'
                        return true
                      }
                    })}
                    className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2 ${
                      errors.square ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                  />
                  {errors.square && (
                    <p className="text-red-500 text-sm mt-1">{errors.square.message}</p>
                  )}
                </div>
              </div>

              {/* Type selector */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaTags /> Type
                </label>
                <TypeSelector
                  selectedType={homeType}
                  switchType={setHomeType}
                  className="gap-1 mt-2"
                />
              </div>

              {/* Country selector */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaFlag /> Country
                </label>
                <CountrySelector
                  country={country}
                  switchCountry={setCountry}
                  className="gap-1 mt-2"
                />
              </div>

              {/* Class selector */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaTags /> Class
                </label>
                <ClassSelector
                  selectedClass={homeClass}
                  switchClass={setHomeClass}
                  className="gap-1 mt-2"
                />
              </div>

              {/* Price field with dynamic hints */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaMoneyBillWave /> Price ($)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  {...register('price', {
                    required: 'Price is required',
                    validate: v => {
                      const num = Number(v)
                      if (isNaN(num)) return 'Price must be a number'
                      if (num < 1) return 'Price must be at least 1$'
                      // class-specific rules
                      if (homeClass === 'Budget' && num > 500)
                        return 'Budget class max is 500$'
                      if (homeClass === 'Medium' && (num < 501 || num > 1000))
                        return 'Medium class between 501$–1000$'
                      if (homeClass === 'Premium') {
                        if (num <= 1001) return 'Premium above 1001$'
                        if (num > 10000000) return 'Premium max 10M$'
                      }
                      return true
                    }
                  })}
                  className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2 ${
                    errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
                {/* Show class-specific price hints */}
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

              {/* Description textarea */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaFileAlt /> Description
                </label>
                <textarea
                  placeholder="Provide details..."
                  {...register('description', { required: 'Description is required' })}
                  className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2 ${
                    errors.description
                      ? 'border-red-500'
                      : 'border-gray-300 dark:border-gray-700'
                  }`}
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Images input component */}
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
                className={`mt-8 w-full rounded bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-400 ${
                  loading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedPage>
  )
}

export default CreateListing
