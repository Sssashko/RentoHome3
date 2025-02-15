import { createHomeQuery } from 'api/homes';
import { useCreateProtectedRequest } from 'hooks';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useHomesStore } from 'store';
import { Image, Country, Class, Type } from 'types';

import { ProtectedPage } from 'components/shared';
import { ImagesInput, TypeSelector, CountrySelector, ClassSelector } from 'components/shared/Home form';

import { createFormData } from './helpers';

// Иконки (необязательно)
import { FaHouseUser, FaRuler, FaMoneyBillWave, FaFileAlt, FaFlag, FaTags } from 'react-icons/fa';

type Data = {
  title: string;
  square: string;
  price: string;
  description: string;
};

const CreateListing = () => {
  const navigate = useNavigate();
  const createProtectedRequest = useCreateProtectedRequest();
  const { createHome } = useHomesStore();

  const [country, setCountry] = useState<Country>('Latvia');
  const [homeClass, setHomeClass] = useState<Class>('Budget');
  const [homeType, setHomeType] = useState<Type>('Apartament');
  const [images, setImages] = useState<(Image | File)[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Data>();

  const submit = async (data: Data) => {
    try {
      setLoading(true);

      const homeListing = {
        ...data,
        title: data.title.trim(),
        price: Number(data.price),
        square: String(data.square),
        country,
        class: homeClass,
        type: homeType,
      };

      if (!homeListing.title || !homeListing.description) {
        setLoading(false);
        return toast.error('Title and description are required!');
      }

      if (!images.length) {
        setLoading(false);
        return toast.error('At least one image is required!');
      }

      const formData = createFormData(homeListing, images);

      const postHome = createProtectedRequest({
        requestQuery: async () => await createHomeQuery(formData),
        callback: createHome,
      });

      await toast.promise(postHome(), {
        success: 'Home has been listed',
        loading: 'Creating listing...',
        error: 'Error while creating listing',
      });

      setLoading(false);
      setTimeout(() => navigate('/'), 300);
    } catch (error) {
      toast.error('An unexpected error occurred!');
      setLoading(false);
    }
  };

  return (
    <ProtectedPage>
      {/* Темный фон + адаптив */}
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl font-bold text-gray-800 dark:text-white">
            Create New Listing
          </h1>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
            Fill out the details below to list your property
          </p>

          {/* Карточка формы */}
          <div className="mt-8 rounded-lg bg-white px-6 py-8 shadow-md sm:px-10 lg:px-12 dark:bg-gray-800">
            <form onSubmit={handleSubmit(submit)}>
              {/* Title + Square */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                    <FaHouseUser />
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cozy Apartment"
                    {...register('title', { required: true })}
                    className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                      text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none 
                      ${errors['title'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                  />
                </div>

                {/* Square */}
                <div>
                  <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                    <FaRuler />
                    Square Footage
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 80"
                    {...register('square', { required: true })}
                    className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                      text-gray-800 dark:text-gray-100
                      placeholder-gray-400 dark:placeholder-gray-500
                      focus:outline-none
                      ${errors['square'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                  />
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

              {/* Price */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaMoneyBillWave />
                  Price ($)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  {...register('price', { required: true })}
                  className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                    text-gray-800 dark:text-gray-100
                    placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none
                    ${errors['price'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                />
              </div>

              {/* Description */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  <FaFileAlt />
                  Description
                </label>
                <textarea
                  placeholder="Provide some details about your property..."
                  {...register('description', { required: true })}
                  className={`mt-1 w-full rounded border-2 bg-transparent px-3 py-2
                   text-gray-800 dark:text-gray-100
                   placeholder-gray-400 dark:placeholder-gray-500
                   focus:outline-none
                   ${errors['description'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                  rows={4}
                />
              </div>

              {/* Images */}
              <div className="mt-6">
                <label className="mb-1 flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-200">
                  Add Images
                </label>
                <ImagesInput 
                  images={images} 
                  setImages={setImages} 
                />
              </div>

              {/* Submit Button */}
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
  );
};

export default CreateListing;
