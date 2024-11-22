import { Dispatch, SetStateAction } from 'react'
import { Country } from 'types'

const countries: Country[] = ['Latvia', 'Estonia']

interface Props {
	country: Country
	switchCountry: Dispatch<SetStateAction<Country>>
	className?: string 
}

const CountrySelector = ({ country, switchCountry }: Props) => (
	<div className="mt-2 flex w-full justify-between">
		{countries.map((item) => (
			<div
				onClick={() => switchCountry(item)}
				className={`flex h-12 w-[45%] cursor-pointer items-center justify-center rounded border-2 border-[#858585] text-lg font-semibold text-[#858585] transition duration-200 focus:outline-none ${
					country === item ? 'bg-[#858585] text-neutral-700' : 'bg-transparent'
				}`}
				key={item}
			>
				{item[0].toUpperCase() + item.slice(1)}
			</div>
		))}
	</div>
)

export default CountrySelector
