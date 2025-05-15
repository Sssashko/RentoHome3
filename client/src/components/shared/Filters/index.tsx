// Combines all individual filter controls
import { Type, Price, Country, Class } from './components'

const Filters = () => (
  <>
    {/* Filter by property type: Apartment or House */}
    <Type />

    {/* Filter by price range: min and max */}
    <Price />

    {/* Filter by country: Latvia, Estonia, Lithuania */}
    <Country />

    {/* Filter by class/category: Budget, Medium, Premium */}
    <Class />
  </>
)

export default Filters
