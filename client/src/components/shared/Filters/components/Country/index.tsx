import { useFiltersStore } from 'store'
import { Country } from 'types'

import { CheckBox } from 'components/ui'

const countriesArray: Country[] = ['Latvia', 'Estonia']

const CountrySelect = () => {
	const { countries, switchTransition } = useFiltersStore()

	return (
		<>
			<h2 className="mx-auto mt-5 text-4xl font-semibold text-white md:text-2xl">
				Country
			</h2>
			<div className="mt-2 w-28">
				{countriesArray.map((country) => (
					<div
						className="flex cursor-pointer items-center gap-2"
						onClick={() => switchTransition(country)}
						key={country}
					>
						<CheckBox active={countries[country]} />
						<h2 className="text-lg text-white">
							{country[0].toUpperCase() + country.slice(1)}
						</h2>
					</div>
				))}
			</div>
		</>
	)
}

export default CountrySelect
