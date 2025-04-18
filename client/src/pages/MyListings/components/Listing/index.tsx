import { useState } from 'react';
import { Home } from 'types';
import { Portal } from 'components/ui';
import { EditListing, Preview } from './components';

const Listing = (home: Home) => {
  const [editHome, setEditHome] = useState(false);
  const { id, title, price, images } = home;

  return (
    <>
      <div
        className="relative w-full max-w-[370px] rounded-lg bg-gray-100 dark:bg-gray-900 text-black dark:text-white shadow-lg overflow-hidden transition-transform hover:scale-105"
        key={images[0].originalName}
      >
        {/* Preview Image */}
        <Preview id={id} image={images[0]} setEditHome={setEditHome} />

        {/* Info */}
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold truncate">{title}</h2>
            <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
            </h2>
          </div>
        </div>

      </div>

      {editHome && (
        <Portal>
          <EditListing {...home} closeModal={() => setEditHome(false)} />
        </Portal>
      )}
    </>
  );
};

export default Listing;
