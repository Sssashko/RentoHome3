import { updateHomeQuery } from 'api/homes'
import { useCreateProtectedRequest } from 'hooks'
import React, { useState, useEffect } from 'react'
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
  const navigate = useNavigate()
  const createProtectedRequest = useCreateProtectedRequest()
  const { editHome } = useHomesStore()

  const {
    title: initialTitle,
    square: initialSquare,
    price: initialPrice,
    class: initialClass,
    country: initialCountry,
    description: initialDescription,
    images: initialImages,
    type: initialType
  } = home

  const [country, setCountry] = useState<Country>(initialCountry)
  const [homeClass, setHomeClass] = useState<Class>(initialClass)
  const [homeType, setHomeType] = useState<Type>(initialType)
  const [images, setImages] = useState<(Image | File)[]>(initialImages ?? [])
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: 'onBlur'
  })

  // Если хотим запретить прокрутку фона, пока открыт модал
  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)

      if (!home || !images) {
        setLoading(false)
        return toast.error('Error: Home data is missing!')
      }

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

      if (!homeIsModified(home, { ...modifiedHome, images })) {
        setLoading(false)
        return toast.error('There are no modifications!')
      }

      const imageFiles = images.filter((item) => item instanceof File) as File[]
      const removedImages = getRemovedImages(images, initialImages ?? [])
      const formData = createFormData(modifiedHome, imageFiles, removedImages)


      for (const [k, v] of formData.entries()) {
        console.log('📦 formData →', k, v);
      }
  

      const updateReq = createProtectedRequest({
        requestQuery: async () => {
          try {
            const resp = await updateHomeQuery(formData);
            return resp;
          } catch (err) {
            throw err;                                     
          }
        },
        callback: editHome,
      });

      await toast.promise(updateReq(), {
        success: 'Home has been modified',
        loading: 'Modifying listing...',
        error: 'Error while modifying listing'
      })

      setLoading(false)
      closeModal()
      setTimeout(() => navigate('/mylistings'), 300)
    } catch (error) {
      setLoading(false)
      toast.error('An unexpected error occurred!')
    }
  }

  return (
    <ProtectedPage>
      {/* Тёмный фон с размытием */}
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={closeModal}
      >
        {/* Контейнер формы (белый блок), похожий на CreateListing */}
        <div
          className="relative z-50 w-full max-w-3xl px-4 sm:px-6 lg:px-8 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="mt-8 text-center text-3xl font-bold text-white dark:text-white">
            Edit Listing
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-150">
            Update the details below to modify your property
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
                    defaultValue={initialTitle}
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
                      ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
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
                    defaultValue={initialSquare}
                    {...register('square', {
                      required: 'Square is required',
                      validate: (value) => {
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
                    className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                      text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none
                      ${errors.square ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
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
                  defaultValue={String(initialPrice)}
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
                      // Проверка класса
                      if (homeClass === 'Budget' && numeric > 500) {
                        return 'Price cannot exceed 500 for Budget class'
                      }
                      if (homeClass === 'Medium') {
                        if (numeric < 501 || numeric > 1000) {
                          return 'Price for Medium class must be 500 - 1000'
                        }
                      }
                      if (homeClass === 'Premium') {
                        if (numeric <= 1001) {
                          return 'Price for Premium class must be above 1001'
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
                    ${errors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}

                {/* Подсказка под ценой */}
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
                  defaultValue={initialDescription}
                  {...register('description', {
                    required: 'Description is required'
                  })}
                  className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                   text-gray-800 dark:text-gray-100
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:outline-none
                   ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
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
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-8 w-full rounded bg-blue-600 py-3 text-lg font-semibold text-white transition 
                  hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
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
