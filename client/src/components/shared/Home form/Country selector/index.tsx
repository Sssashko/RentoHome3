import { Dispatch, SetStateAction } from 'react'
import { Country } from 'types'

// Available country options
const countries: Country[] = ['Latvia', 'Estonia', 'Lithuania']

interface Props {
  country: Country
  switchCountry: Dispatch<SetStateAction<Country>>
  className?: string
}

/**
 * Renders buttons for each country.
 * - Highlights the selected country.
 * - Calls switchCountry(option) on click.
 */
const CountrySelector = ({ country, switchCountry, className }: Props) => (
  <div className={`flex w-full justify-between mt-2 ${className || ''}`}>
    {countries.map(item => (
      <div key={item}
           onClick={() => switchCountry(item)}               // update selected country
           className={`
             flex h-12 w-[30%] cursor-pointer items-center justify-center rounded border-2 border-[#858585] text-lg font-semibold transition duration-200 focus:outline-none
             ${country === item
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

export default CountrySelector
