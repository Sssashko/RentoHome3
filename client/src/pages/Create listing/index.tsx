import { createHomeQuery } from 'api/homes';
import { useCreateProtectedRequest } from 'hooks';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useHomesStore } from 'store';
import { Image, Country, Class, Type } from 'types';

import { ProtectedPage } from 'components/shared';
import { ImagesInput, TypeSelector, CountrySelector, ClassSelector } from 'components/shared/Home form';

import { createFormData } from './helpers';

type Data = {
	year: string;
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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Data>();

	const submit = async (data: Data) => {
		setLoading(true);

		const year = Number(data.year);
		const price = Number(data.price);
		const square = String(data.square);

		const homeListing = { ...data, year, price, square, country, class: homeClass, type: homeType };

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
		navigate('/');
	};

	return (
		<ProtectedPage>
			<div className="mx-auto my-5 flex h-full w-full items-center justify-center px-4 md:px-0">
				<form
					className="scrollbar h-fit w-full max-w-md rounded-lg bg-neutral-700 px-6 py-8 text-white sm:px-10 md:max-w-xl lg:max-w-2xl lg:px-16"
					onSubmit={handleSubmit(submit)}
					onClick={(e) => e.stopPropagation()}
				>
					<div className="mt-2 flex flex-col gap-4 md:flex-row md:gap-6">
						<div className="w-full md:w-1/2">
							<input
								type="number"
								{...register('year', { required: true })}
								className={`h-12 w-full rounded border-2 bg-transparent text-center font-semibold transition duration-200 focus:outline-none ${
									errors['year'] ? 'border-red-500' : 'border-[#858585]'
								}`}
							/>
							<h3 className="mt-2 text-center text-sm font-bold text-[#858585]">Year</h3>
						</div>

						<div className="w-full md:w-1/2">
							<input
								type="number"
								{...register('square', { required: true })}
								className={`h-12 w-full rounded border-2 bg-transparent text-center font-semibold transition duration-200 focus:outline-none ${
									errors['square'] ? 'border-red-500' : 'border-[#858585]'
								}`}
							/>
							<h3 className="mt-2 text-center text-sm font-bold text-[#858585]">Square Footage</h3>
						</div>
					</div>

					<div className="mt-6">
						<TypeSelector selectedType={homeType} switchType={setHomeType} className="gap-1" />
						<h3 className="text-center text-sm font-bold text-[#858585]">Type</h3>
					</div>

					<div className="mt-6">
						<CountrySelector country={country} switchCountry={setCountry} />
						<h3 className="text-center text-sm font-bold text-[#858585]">Country</h3>
					</div>

					<div className="mt-6">
						<ClassSelector selectedClass={homeClass} switchClass={setHomeClass} className="gap-1" />
						<h3 className="text-center text-sm font-bold text-[#858585] mt-5">Class</h3>
					</div>

					<div className="mt-5">
						<input
							type="number"
							{...register('price', { required: true })}
							className={`h-12 w-full rounded border-2 bg-transparent text-center font-semibold transition duration-200 focus:outline-none ${
								errors['price'] ? 'border-red-500' : 'border-[#858585]'
							}`}
						/>
						<h3 className="mt-2 text-center text-sm font-bold text-[#858585]">Price ($)</h3>
					</div>

					<div className="mt-5">
						<textarea
							{...register('description', { required: true })}
							className={`scrollbar h-36 w-full rounded border-2 bg-transparent px-2 py-1 transition duration-200 focus:outline-none ${
								errors['description'] ? 'border-red-500' : 'border-[#858585]'
							}`}
						/>
						<h3 className="mt-2 text-center text-sm font-bold text-[#858585]">Description</h3>
					</div>

					<div className="mt-5">
						<ImagesInput images={images} setImages={setImages} />
						<h3 className="mt-2 text-center text-sm font-bold text-[#858585]">Add Images</h3>
					</div>

					<button
						className={`m-auto mt-5 block h-12 w-full max-w-sm rounded-md bg-green-600 font-semibold transition duration-200 sm:w-72 ${
							loading ? 'pointer-events-none opacity-70' : 'hover:bg-opacity-90'
						}`}
						type="submit"
					>
						Create listing
					</button>
				</form>
			</div>
		</ProtectedPage>
	);
};

export default CreateListing;
