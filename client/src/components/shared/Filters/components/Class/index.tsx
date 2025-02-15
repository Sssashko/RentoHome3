import { useFiltersStore } from 'store'
import { Class } from 'types'
import { CheckBox } from 'components/ui'

const typesArray: Class[] = ['Budget', 'Medium', 'Premium']

const ClassSelect = () => {
  const { classes, switchClass } = useFiltersStore()

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-white">
      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Class</h2>
      {typesArray.map((type) => (
        <div
          key={type}
          className="flex items-center gap-2 mb-2 cursor-pointer"
          onClick={() => switchClass(type)}
        >
          <CheckBox active={classes[type]} />
          <span className="font-semibold">{type[0].toUpperCase() + type.slice(1)}</span>
        </div>
      ))}
    </div>
  )
}

export default ClassSelect
