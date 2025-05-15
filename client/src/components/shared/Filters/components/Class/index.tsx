import { useFiltersStore } from 'store'
import { Class } from 'types'
import { CheckBox } from 'components/ui'

// Possible class options
const classesArray: Class[] = ['Budget', 'Medium', 'Premium']

const ClassSelect = () => {
  // pull current class filters and toggle action from Zustand store
  const { classes, switchClass } = useFiltersStore()

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-gray-800 dark:text-white">
      <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        Class
      </h2>

      {classesArray.map((cls) => (
        <div
          key={cls}
          className="flex items-center gap-2 mb-2 cursor-pointer"
          onClick={() => switchClass(cls)} // toggle this class on/off
        >
          <CheckBox active={classes[cls]} />
          <span className="font-semibold">
            {cls[0].toUpperCase() + cls.slice(1)}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ClassSelect
