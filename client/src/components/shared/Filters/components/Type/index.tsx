import { useFiltersStore } from 'store'
import { Type } from 'types'
import { CheckBox } from 'components/ui'

const allTypes: Type[] = ['Apartament', 'House'] 

const TypeFilter = () => { 
	const { types, switchType } = useFiltersStore() 

	return (
		<>
			<h2 className="mx-auto mt-5 text-4xl font-semibold text-white md:mt-4 md:text-2xl">
				Type
			</h2>
			<div className="mt-4">
				<div
					className="flex cursor-pointer items-center gap-2"
					onClick={() => allTypes.forEach((type) => switchType(type))} 
				>
					<CheckBox active={Object.values(types).every(value => !value)} /> 
					<h2 className="font-semibold text-white md:text-sm">ALL</h2>
				</div>
				{allTypes.map((type) => ( 
					<div
						className="mt-2.5 flex cursor-pointer items-center gap-2"
						onClick={() => switchType(type)} // Toggle each type individually
						key={type}
					>
						<CheckBox active={types[type]} /> 
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
