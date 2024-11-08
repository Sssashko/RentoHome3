import { useFiltersStore } from 'store'

import { CheckBox } from 'components/ui'

const allTypes = ['apartament', 'house'] 

const TypeFilter = () => { 
	const { types, applyTypeFilter, unApplyTypeFilter } = useFiltersStore() 

	return (
		<>
			<h2 className="mx-auto mt-5 text-4xl font-semibold text-white md:mt-4 md:text-2xl">
				Type {}
			</h2>
			<div className="mt-4">
				<div
					className="flex cursor-pointer items-center gap-2"
					onClick={() => types.forEach((type) => unApplyTypeFilter(type))} 
				>
					<CheckBox active={types.length === 0} /> 
					<h2 className="font-semibold text-white md:text-sm">ALL</h2>
				</div>
				{allTypes.map((type) => ( 
					<div
						className="mt-2.5 flex cursor-pointer items-center gap-2"
						onClick={() => {
							if (types.includes(type)) { 
								unApplyTypeFilter(type) 
							} else {
								applyTypeFilter(type) 
							}
						}}
						key={type}
					>
						<CheckBox active={types.includes(type)} /> 
						<h2 className="font-semibold text-white md:text-sm">
							{type.toUpperCase()}
						</h2>
					</div>
				))}
			</div>
		</>
	)
}
export default TypeFilter
