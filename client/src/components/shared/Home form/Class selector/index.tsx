import { Dispatch, SetStateAction } from 'react'
import { Class } from 'types'

// Available class options
const types: Class[] = ['Budget', 'Medium', 'Premium']

interface Props {
  selectedClass: Class
  switchClass: Dispatch<SetStateAction<Class>>
  className?: string
}

/**
 * Renders three buttons (Budget, Medium, Premium).
 * - Highlights the one matching selectedClass.
 * - Calls switchClass(option) on click.
 */
const ClassSelector = ({ selectedClass, switchClass, className }: Props) => (
  <div className={`flex w-full justify-between ${className || ''}`}>
    {types.map(item => (
      <div key={item}
           onClick={() => switchClass(item)}                  // update parent state
           className={`
             flex h-12 w-[30%] cursor-pointer items-center justify-center rounded border-2 border-[#858585] text-lg font-semibold transition duration-200 focus:outline-none
             ${selectedClass === item
               ? 'bg-[#858585] text-neutral-700'               // active style
               : 'bg-transparent text-[#858585]'               // inactive style
             }
           `}
      >
        {item[0].toUpperCase() + item.slice(1)}
      </div>
    ))}
  </div>
)

export default ClassSelector
