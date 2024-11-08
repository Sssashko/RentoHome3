import { Dispatch, SetStateAction } from 'react'
import { Class } from 'types'

const types: Class[] = ['budget', 'medium', 'premium']

interface Props {
	selectedClass: Class;
	switchClass: Dispatch<SetStateAction<Class>>
}

const ClassSelector = ({ selectedClass, switchClass }: Props) => (
	<div className="mt-5 flex w-full justify-between">
		{types.map((item) => (
			<div
				onClick={() => switchClass(item)}
				className={`flex h-12 w-[45%] cursor-pointer items-center justify-center rounded border-2 border-[#858585] text-lg font-semibold text-[#858585] transition duration-200 focus:outline-none ${
					selectedClass === item ? 'bg-[#858585] text-neutral-700' : 'bg-transparent'
				}`}
				key={item}
			>
				{item[0].toUpperCase() + item.slice(1)}
			</div>
		))}
	</div>
)

export default ClassSelector
