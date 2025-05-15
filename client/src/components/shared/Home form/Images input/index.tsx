import { Dispatch } from 'react';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { Image } from 'types';
import Picture from './components/Picture';

interface Props {
  images: (Image | File)[];
  setImages: Dispatch<React.SetStateAction<(Image | File)[]>>;
}

/**
 * Shows a grid of uploaded images with remove buttons,
 * plus an “Add image” card that opens the file picker.
 */
const ImagesInput = ({ images, setImages }: Props) => {
  // Remove image at given index from state
  const removeImage = (index: number) =>
    setImages((imgs) => imgs.filter((_, i) => i !== index));

  // When user picks files, append them to the existing images array
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setImages((imgs) => [...imgs, ...filesArray]);
  };

  // Reset input value on click so the same file can be re-selected
  const handleFileClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget as HTMLInputElement;
    input.value = '';
  };

  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 gap-x-4 gap-y-3 mt-2">
      {/*
        Render each image using the Picture component.
        Picture shows a thumbnail and a remove icon on hover.
      */}
      {images.map((image, index) => (
        <Picture
          key={index}
          image={image}
          removeImage={() => removeImage(index)}
        />
      ))}

      {/*
        The “Add image” card. Clicking it opens the hidden file input.
      */}
      <label htmlFor="images-input">
        <div className="flex aspect-video w-full cursor-pointer rounded-lg bg-neutral-900">
          <div className="flex h-full w-full flex-col justify-center">
            <h3 className="mx-auto text-sm font-semibold text-zinc-300 sm:text-lg">
              Add image
            </h3>
            <BiSolidMessageSquareAdd
              size={30}
              className="mx-auto mt-0.5 text-green-600"
            />
          </div>
        </div>
      </label>

      {/*
        Invisible file input. Supports multiple images.
        onChange adds files, onClick clears previous selection.
      */}
      <input
        id="images-input"
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleFileChange}
        onClick={handleFileClick}
      />
    </div>
  );
};

export default ImagesInput;
