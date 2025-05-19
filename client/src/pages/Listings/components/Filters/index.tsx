import { useState, useRef, useEffect } from 'react'
import { Filters } from 'components/shared'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const HomeFilters = () => {
  // expand/collapse state
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  // measure content height when toggled
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [isExpanded])

  return (
    <div className="my-4 hidden md:flex flex-col gap-2 items-center rounded-lg bg-white dark:bg-gray-800 shadow p-4 text-gray-800 dark:text-white ml-8 w-60 mt-8">
      {/* Header with expand/collapse button */}
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Filters</h1>
        {isExpanded ? (
          <FaChevronUp className="text-blue-600 dark:text-blue-400 transition-transform duration-200" />
        ) : (
          <FaChevronDown className="text-blue-600 dark:text-blue-400 transition-transform duration-200" />
        )}
      </div>

      {/* Animated filter panel */}
      <div
        ref={contentRef}
        className="w-full overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isExpanded ? `${contentHeight}px` : '0px' }}
      >
        <Filters /> {/* actual filter controls */}
      </div>
    </div>
  )
}

export default HomeFilters
