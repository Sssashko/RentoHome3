import { AiOutlineEdit } from 'react-icons/ai'

interface Props {
  onClick: () => void
}

// simple reusable (atkārtoti lietojams) edit icon button
const EditButton = ({ onClick }: Props) => (
  <AiOutlineEdit
    size={35}
    color="white"
    className="cursor-pointer transition duration-200 hover:scale-110"
    onClick={onClick} // open edit modal on click
  />
)

export default EditButton
