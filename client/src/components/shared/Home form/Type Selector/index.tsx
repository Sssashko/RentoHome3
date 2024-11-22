import { Dispatch, SetStateAction } from 'react'
import { Type } from 'types'

const types: Type[] = ['Apartament', 'House']

interface Props {
	selectedType: Type
	switchType: Dispatch<SetStateAction<Type>>
	className?: string 
}

const TypeSelector = ({ selectedType, switchType, className }: Props) => (
	<div className={`mt-2 flex w-full justify-between gap-2 ${className}`}> 
		{types.map((type) => (
			<div
				onClick={() => switchType(type)}
				className={`flex h-12 w-[45%] cursor-pointer items-center justify-center rounded border-2 border-[#858585] text-lg font-semibold text-[#858585] transition duration-200 focus:outline-none ${
					selectedType === type ? 'bg-[#858585] text-neutral-700' : 'bg-transparent'
				}`}
				key={type}
			>
				{type[0].toUpperCase() + type.slice(1)}
			</div>
		))}
	</div>
)

export default TypeSelector
