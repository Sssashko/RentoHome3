import { Dispatch, SetStateAction } from 'react'
import { Type } from 'types'

// Available home types
const types: Type[] = ['Apartament', 'House']

interface Props {
  selectedType: Type
  switchType: Dispatch<SetStateAction<Type>>
  className?: string
}

/**
 * Renders two toggles: Apartament and House.
 * - Highlights the selectedType.
 * - Calls switchType(type) on click.
 */
const TypeSelector = ({ selectedType, switchType, className }: Props) => (
  <div className={`mt-2 flex w-full justify-between gap-2 ${className || ''}`}>
    {types.map(type => (
      <div key={type}
           onClick={() => switchType(type)}                  // change selected type
           className={`
             flex h-12 w-[45%] cursor-pointer items-center justify-center rounded border-2 border-[#858585] text-lg font-semibold transition duration-200 focus:outline-none
             ${selectedType === type
               ? 'bg-[#858585] text-neutral-700'               // active style
               : 'bg-transparent text-[#858585]'               // inactive style
             }
           `}
      >
        {type[0].toUpperCase() + type.slice(1)}
      </div>
    ))}
  </div>
)

export default TypeSelector
