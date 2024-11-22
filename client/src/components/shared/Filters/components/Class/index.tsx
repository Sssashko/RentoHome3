import { useFiltersStore } from 'store'
import { Class } from 'types'

import { CheckBox } from 'components/ui'

const typesArray: Class[] = ['Budget', 'Medium',  'Premium']

const ClassSelect = () => {
	const { classes, switchClass } = useFiltersStore()

	return (
		<>
			<h2 className="mx-auto mt-5 text-4xl font-semibold text-white md:mt-4 md:text-2xl">
				Class
			</h2>
			<div className="mt-2 w-28">
				{typesArray.map((type) => (
					<div
						className="flex cursor-pointer items-center gap-2"
						onClick={() => switchClass(type)}
						key={type}
					>
						<CheckBox active={classes[type]} />
						<h2 className="text-lg text-white">
							{type[0].toUpperCase() + type.slice(1)}
						</h2>
					</div>
				))}
			</div>
		</>
	)
}

export default ClassSelect
