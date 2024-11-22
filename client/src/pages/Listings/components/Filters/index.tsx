import { Filters } from 'components/shared'

const HomeFilters = () => (
	<div className="my-16 hidden flex-col items-center rounded-r-xl bg-neutral-700 p-8 text-white md:flex">
		<h1 className="text-3xl font-bold">Filters</h1>
		<Filters />
	</div>
)

export default HomeFilters
