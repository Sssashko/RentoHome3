import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface House {
  id: number;
  image: string;
  title: string;
  price: string;
  country: string;
  status: string;
  rating: number;
}

// Example data
const houses: House[] = [
  {
    id: 1,
    image: '/Appartament1.webp',
    title: 'Cozy Apartment',
    price: '$1,200 / month',
    country: 'USA',
    status: 'Available',
    rating: 4,
  },
  {
    id: 2,
    image: '/Appartament2.webp',
    title: 'Modern Loft',
    price: '$1,600 / month',
    country: 'Canada',
    status: 'Available',
    rating: 5,
  },
  {
    id: 3,
    image: '/Appartament3.webp',
    title: 'Beachfront Villa',
    price: '$2,400 / month',
    country: 'Spain',
    status: 'Rented',
    rating: 4,
  },
  {
    id: 4,
    image: '/House4.webp',
    title: 'Mountain Cabin',
    price: '$900 / month',
    country: 'Switzerland',
    status: 'Available',
    rating: 3,
  },
  {
    id: 5,
    image: '/House5.webp',
    title: 'Urban Studio',
    price: '$1,050 / month',
    country: 'UK',
    status: 'Available',
    rating: 5,
  },
];

// Duplicate data for a continuous loop
const repeatedHouses = [...houses, ...houses];

const CARD_WIDTH = 336; 

const HousesCarousel: React.FC = () => {
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => (prev >= houses.length * CARD_WIDTH ? 0 : prev + 1));
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gray-150 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-8">
          Most Popular Choices
        </h2>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex"
            style={{
              width: repeatedHouses.length * CARD_WIDTH,
              transform: `translateX(-${scrollX}px)`,
              transition: 'transform 0.0001s linear',
            }}
          >
            {repeatedHouses.map((house, idx) => (
              <div
                key={`${house.id}-${idx}`}
                className="w-80 mr-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-4 flex-shrink-0"
              >
                <img
                  src={house.image}
                  alt={house.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {house.title}
                </h3>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < house.rating ? (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-500 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.958c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.958a1 1 0 00-.364-1.118L2.974 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
                      </svg>
                    ) : (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.75.75 0 011.04 0l2.065 2.103c.126.128.29.217.467.257l2.877.645c.798.178 1.116 1.164.538 1.756l-2.052 2.08a.75.75 0 00-.186.537l.159 2.968c.045.835-.814 1.42-1.58 1.047l-2.641-1.318a.75.75 0 00-.658 0l-2.641 1.318c-.767.373-1.625-.212-1.58-1.047l.159-2.968a.75.75 0 00-.186-.537l-2.052-2.08c-.578-.592-.26-1.578.538-1.756l2.877-.645a.75.75 0 00.467-.257l2.065-2.103z"
                        />
                      </svg>
                    )
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{house.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Country: {house.country}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Status: {house.status}
                </p>
                <Link
                  to={`/house/${house.id}`}
                  className="mt-4 w-full inline-block text-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HousesCarousel;
