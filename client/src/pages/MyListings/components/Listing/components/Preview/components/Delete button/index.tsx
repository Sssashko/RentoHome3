import { MdOutlineDelete } from 'react-icons/md'

interface Props {
  onClick: () => void
}

// simple reusable delete icon button
const DeleteButton = ({ onClick }: Props) => (
  <MdOutlineDelete
    size={35}
    color="white"
    className="cursor-pointer transition duration-200 hover:scale-110"
    onClick={onClick} // invoke (izsauc) parent handler when clicked
  />
)

export default DeleteButton
