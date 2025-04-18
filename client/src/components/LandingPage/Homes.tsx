/* src/pages/Home/components/TopListings.tsx */
import React from 'react';
import { Link } from 'react-router-dom';
import { useHomesStore } from 'store';
import { Home } from 'types';
import { FaHeart } from 'react-icons/fa';

const TopListings: React.FC = () => {
  const { homes } = useHomesStore();
  const topThree = [...homes].sort((a, b) => b.likes - a.likes).slice(0, 3);

  if (!topThree.length) return null;

  return (
    <section className="bg-gray-150 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-12">
          Most&nbsp;Popular&nbsp;Listings
        </h2>

        <div className="grid gap-10 lg:gap-14 md:grid-cols-3">
          {topThree.map((home, idx) => (
            <ListingCard key={home.id} home={home} rank={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopListings;

/* ---------------- card ---------------- */
interface CardProps {
  home: Home;
  rank: number;          // было 1 | 2 | 3
}

const ListingCard: React.FC<CardProps> = ({ home, rank }) => {
  const { id, title, price, country, images, likes } = home;

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/90
                 dark:bg-gray-800/90 shadow-lg ring-1 ring-gray-200 dark:ring-gray-700
                 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* cover */}
      <img
        src={images[0]?.url || '/default-home.jpg'}
        alt={title}
        className="h-56 w-full object-cover transition-scale duration-500 group-hover:scale-105"
      />

      {/* TOP badge */}
      <span
        className="absolute bottom-4 left-4 rounded-full bg-yellow-400/90 px-3 py-1
                   text-xs font-bold text-gray-900 shadow-md"
      >
        TOP&nbsp;{rank}
      </span>

      {/* body */}
      <div className="flex grow flex-col p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{country}</p>

        <p className="mt-4 text-gray-900 dark:text-gray-200 text-xl font-bold">
          ${price.toLocaleString()}
          <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
            / night
          </span>
        </p>

        <p className="mt-2 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <FaHeart className="text-red-500" /> {likes}
        </p>

        <div className="grow" />

        <Link
          to={`/${id}`}
          className="mt-6 inline-block w-full rounded-md bg-blue-600 py-3 text-center
                     font-semibold text-white transition-colors hover:bg-blue-700
                     focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          View
        </Link>
      </div>
    </div>
  );
};
