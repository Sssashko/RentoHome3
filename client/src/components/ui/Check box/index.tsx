import { Transition } from '@headlessui/react' // animation helper
import { FaCheck } from 'react-icons/fa'        // check mark icon

interface Props {
  active: boolean  // whether the box is checked
}

const CheckBox = ({ active }: Props) => (
  <div
    className="flex h-[18px] w-[18px] items-center justify-center rounded border border-neutral-400"
  >
    {/* show the check icon only when active */}
    <Transition
      show={active}
      className="transition duration-200"
      enterFrom="opacity-0"
      leaveTo="opacity-0"
    >
      <FaCheck className="text-neutral-400" size={10} />
    </Transition>
  </div>
)

export default CheckBox
