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

type FormData = {
  title: string
  square: string   // react-hook-form хранит как строку, но проверяем в validate
  price: string    // react-hook-form хранит как строку, но проверяем в validate
  description: string
}

const CreateListing = () => {
  const navigate = useNavigate()
  const createProtectedRequest = useCreateProtectedRequest()
  const { createHome } = useHomesStore()

  const [country, setCountry] = useState<Country>('Latvia')
  const [homeClass, setHomeClass] = useState<Class>('Budget')
  const [homeType, setHomeType] = useState<Type>('Apartament')

  // Картинки вне react-hook-form, поэтому проверяем отдельно
  const [images, setImages] = useState<(Image | File)[]>([])
  const [imagesError, setImagesError] = useState('')
  const [loading, setLoading] = useState(false)

  // Инициализация react-hook-form с локальной валидацией
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur'
  })

  const onSubmit = async (data: FormData) => {
    // Перед отправкой сбрасываем ошибку по картинкам
    setImagesError('')

    // Проверяем, что есть хотя бы 1 изображение
    if (!images.length) {
      setImagesError('At least one image is required!')
      return
    }

    try {
      setLoading(true)

      // Формируем итоговый объект для отправки
      const homeListing = {
        ...data,
        title: data.title.trim(),
        price: Number(data.price),
        square: data.square, // пусть остаётся строкой
        country,
        class: homeClass,
        type: homeType
      }

      // Создаём FormData для отправки
      const formData = createFormData(homeListing, images)

      const postHome = createProtectedRequest({
        requestQuery: async () => await createHomeQuery(formData),
        callback: createHome
      })

      // Показываем всплывающее уведомление (toast) при создании
      await toast.promise(postHome(), {
        success: 'Home has been listed',
        loading: 'Creating listing...',
        error: 'Error while creating listing'
      })

      setLoading(false)
      navigate('/mylistings')
    } catch (error) {
      setLoading(false)
      toast.error('An unexpected error occurred!')
    }
  }

  return (
    <ProtectedPage>
      <div className="min-h-screen w-full bg-gray-150 dark:bg-gray-900 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
            Create New Listing
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
            Fill out the details below to list your property
          </p>

          <div className="mt-8 rounded-lg bg-white px-6 py-8 shadow-md sm:px-10 lg:px-12 dark:bg-gray-800">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Title + Square */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TITLE */}
                <div>
                  <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                    <FaHouseUser />
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cozy Apartment"
                    {...register('title', {
                      required: 'Title is required',
                      minLength: {
                        value: 2,
                        message: 'Title must be at least 2 characters long'
                      },
                      validate: (value) => {
                        if (/^\d+$/.test(value)) {
                          return 'Title cannot consist only of digits'
                        }
                        return true
                      }
                    })}
                    className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                      text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none 
                      ${
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

                {/* SQUARE */}
                <div>
                  <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                    <FaRuler />
                    Square Footage
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 80"
                    {...register('square', {
                      required: 'Square is required',
                      validate: (value) => {
                        const numeric = Number(value)
                        if (Number.isNaN(numeric)) {
                          return 'Square must be a valid number (no letters)'
                        }
                        if (numeric < 5 || numeric > 100000) {
                          return 'Square must be between 5 and 100,000'
                        }
                        return true
                      }
                    })}
                    className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                      text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none
                      ${
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

              {/* Type Selector */}
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

              {/* Country Selector */}
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

              {/* Class Selector */}
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

              {/* PRICE */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaMoneyBillWave />
                  Price ($)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  {...register('price', {
                    required: 'Price is required',
                    validate: (value) => {
                      const numeric = Number(value)
                      if (Number.isNaN(numeric)) {
                        return 'Price must be a valid number (no letters)'
                      }
                      if (numeric < 1) {
                        return 'Price must be at least 1'
                      }
                      // Проверка на класс:
                      if (homeClass === 'Budget' && numeric > 500) {
                        return 'Price cannot exceed 500 for Budget class'
                      }
                      if (homeClass === 'Medium') {
                        if (numeric < 501 || numeric > 1000) {
                          return 'Price for Medium class must be 501 - 1000'
                        }
                      }
                      if (homeClass === 'Premium') {
                        if (numeric <= 1001) {
                          return 'Price for Premium class must be above 1000'
                        }
                        if (numeric > 10000000) {
                          return 'Price must not exceed 10,000,000 for Premium class'
                        }
                      }
                      return true
                    }
                  })}
                  className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                    text-gray-800 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none
                    ${
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

                {/* Подсказка под ценой в зависимости от класса */}
                {homeClass === 'Budget' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Price range for Budget: 1$ - 500$
                  </p>
                )}
                {homeClass === 'Medium' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Price range for Medium: 501$ - 1000$
                  </p>
                )}
                {homeClass === 'Premium' && (
                  <p className="text-xs text-gray-500 mt-1">
                    Price range for Premium: above 1001$ up to 10,000,000$
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaFileAlt />
                  Description
                </label>
                <textarea
                  placeholder="Provide some details about your property..."
                  {...register('description', {
                    required: 'Description is required'
                  })}
                  className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                   text-gray-800 dark:text-gray-100
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:outline-none
                   ${
                     errors.description
                       ? 'border-red-500'
                       : 'border-gray-300 dark:border-gray-700'
                   }`}
                  rows={4}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* IMAGES */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  Add Images
                </label>
                <ImagesInput images={images} setImages={setImages} />
                {imagesError && (
                  <p className="text-red-500 text-sm mt-1">
                    {imagesError}
                  </p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-8 w-full rounded bg-blue-600 py-3 text-lg font-semibold text-white transition 
                  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
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
