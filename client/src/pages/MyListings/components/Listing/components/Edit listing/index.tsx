import { updateHomeQuery } from 'api/homes';
import { useCreateProtectedRequest } from 'hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useHomesStore } from 'store';
import { Home, Image, Country, Class, Type } from 'types';

import { ProtectedPage } from 'components/shared';
import { ImagesInput, TypeSelector, CountrySelector, ClassSelector } from 'components/shared/Home form';
import { createFormData, homeIsModified, getRemovedImages } from './helpers';

type Data = {
  year: string;
  square: string;
  price: string;
  description: string;
};

type Props = Home & { closeModal: () => void };

const EditListing = ({ closeModal, ...home }: Props) => {
  const navigate = useNavigate();
  const createProtectedRequest = useCreateProtectedRequest();
  const { editHome } = useHomesStore();

  const {
    year: initialYear,
    square: initialSquare,
    price: initialPrice,
    class: initialClass,
    country: initialCountry,
    description: initialDescription,
    images: initialImages,
    type: initialType,
  } = home;


  const [country, setCountry] = useState<Country>(initialCountry);
  const [homeClass, setHomeClass] = useState<Class>(initialClass);
  const [homeType, setHomeType] = useState<Type>(initialType);
  const [images, setImages] = useState<(Image | File)[]>(initialImages);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<Data>();

  const submit = async (data: Data) => {
    setLoading(true);

    const year = Number(data.year);
    const price = Number(data.price);
    const square = String(data.square);

    const modifiedHome = {
      ...home,
      ...data,
      year,
      price,
      square,
      country,
      class: homeClass,
      type: homeType,
    };

    if (!homeIsModified(home, { ...modifiedHome, images })) {
      setLoading(false);
      return toast.error('There are no modifications!');
    }

    const imageFiles = images.filter((item) => item instanceof File) as File[];
    const removedImages = getRemovedImages(images, initialImages);
    const formData = createFormData(modifiedHome, imageFiles, removedImages);

    const updateHome = createProtectedRequest({
      requestQuery: async () => await updateHomeQuery(formData),
      callback: editHome,
    });

    await toast.promise(updateHome(), {
      success: 'Home has been modified',
      loading: 'Modifying listing...',
      error: 'Error while modifying listing',
    });

    setLoading(false);
    closeModal();
    navigate('/');
  };

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, []);

  return (
<ProtectedPage>
  {/* Background Overlay */}
  <div
    className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    onClick={closeModal}
  >
    <form
      className="relative z-50 scrollbar w-full max-w-md rounded-lg bg-neutral-700 px-6 py-6 text-white shadow-lg sm:px-8 md:px-10 lg:max-w-lg lg:px-12"
      onSubmit={handleSubmit(submit)}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Year and Square Footage */}
      <div className="mt-2 flex w-full justify-between gap-3">
        <div className="w-1/2">
          <input
            type="number"
            {...register('year', { required: true })}
            defaultValue={initialYear}
            className={`h-10 w-full rounded border-2 bg-transparent text-center font-medium transition duration-200 focus:outline-none ${
              errors['year'] ? 'border-red-500' : 'border-[#858585]'
            }`}
          />
          <h3 className="mt-1 text-center text-xs font-semibold text-[#858585]">Year</h3>
        </div>

        <div className="w-1/2">
          <input
            type="number"
            {...register('square', { required: true })}
            defaultValue={initialSquare}
            className={`h-10 w-full rounded border-2 bg-transparent text-center font-medium transition duration-200 focus:outline-none ${
              errors['square'] ? 'border-red-500' : 'border-[#858585]'
            }`}
          />
          <h3 className="mt-1 text-center text-xs font-semibold text-[#858585]">
            Square Footage
          </h3>
        </div>
      </div>

      {/* Type Selector */}
      <div className="mt-4">
        <TypeSelector selectedType={homeType} switchType={setHomeType} className="gap-1" />
        <h3 className="text-center text-xs font-semibold text-[#858585]">Type</h3>
      </div>

      {/* Country Selector */}
      <div className="mt-4">
        <CountrySelector country={country} switchCountry={setCountry} />
        <h3 className="text-center text-xs font-semibold text-[#858585]">Country</h3>
      </div>

      {/* Class Selector */}
      <div className="mt-4">
        <ClassSelector selectedClass={homeClass} switchClass={setHomeClass} className="gap-1" />
        <h3 className="text-center text-xs font-semibold text-[#858585] mt-3">Class</h3>
      </div>

      {/* Price */}
      <div className="mt-4">
        <input
          type="number"
          {...register('price', { required: true })}
          defaultValue={initialPrice}
          className={`h-10 w-full rounded border-2 bg-transparent text-center font-medium transition duration-200 focus:outline-none ${
            errors['price'] ? 'border-red-500' : 'border-[#858585]'
          }`}
        />
        <h3 className="mt-1 text-center text-xs font-semibold text-[#858585]">Price ($)</h3>
      </div>

      {/* Description */}
      <div className="mt-4">
        <textarea
          {...register('description', { required: true })}
          defaultValue={initialDescription}
          className={`scrollbar h-28 w-full rounded border-2 bg-transparent px-2 py-1 text-sm transition duration-200 focus:outline-none ${
            errors['description'] ? 'border-red-500' : 'border-[#858585]'
          }`}
        />
        <h3 className="mt-1 text-center text-xs font-semibold text-[#858585]">Description</h3>
      </div>

      {/* Images Input */}
      <div className="mt-4">
        <ImagesInput images={images} setImages={setImages} />
        <h3 className="mt-1 text-center text-xs font-semibold text-[#858585]">Add Images</h3>
      </div>

      {/* Submit Button */}
      <button
        className={`m-auto mt-4 block h-10 w-full max-w-xs rounded-md bg-green-600 font-medium transition duration-200 sm:w-64 ${
          loading ? 'pointer-events-none opacity-70' : 'hover:bg-opacity-90'
        }`}
        type="submit"
      >
        Edit listing
      </button>
    </form>
  </div>
</ProtectedPage>

  );
};

export default EditListing;
