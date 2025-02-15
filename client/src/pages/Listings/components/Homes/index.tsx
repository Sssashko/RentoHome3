import { useFilteredHomes } from 'hooks';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';

const Homes = () => {
  const homes = useFilteredHomes();

  if (!homes.length) {
    return (
      <h1 className="mx-auto mt-10 p-4 text-center text-2xl font-bold text-gray-800 dark:text-white">
        No homes matching your queries found!
      </h1>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 p-2 mt-6">
      {homes.map(({ id, title, price, images, square, country, class: homeClass }) => {
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        return (
          <NavLink
            key={id}
            to={`/${id}`}
            className="relative block w-full h-auto min-h-[280px] overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 bg-white dark:bg-gray-800 ml-10"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={images[0]?.url || '/default-home.jpg'}
                alt={`Home ${id}`}
                className="w-full h-52 object-cover transition-transform duration-500"
              />
              {/* Guest Pick Label */}
              <span className="absolute top-2 left-2 bg-white dark:bg-gray-700 text-sm font-semibold px-3 py-1 rounded-md shadow-md">
                Guest Pick
              </span>
              {/* Favorite Button */}
              <FaHeart
                className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 hover:text-red-500 transition cursor-pointer"
                size={18}
              />
            </div>

            {/* Info */}
            <div className="p-3 space-y-2">
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              {/* Country & Class */}
              <p className="text-md text-gray-700 dark:text-gray-400">{country} • {homeClass}</p>
              {/* Area */}
              <p className="text-md text-gray-700 dark:text-gray-400">Area: {square} m²</p>
              {/* Price */}
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formattedPrice}$ / night
              </p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Homes;
