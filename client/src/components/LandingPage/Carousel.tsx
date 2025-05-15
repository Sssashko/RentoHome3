// Simple image carousel: rotates through images every few seconds

import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
  interval?: number; // time in ms between slides
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 4000 }) => {
  // current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // advance index on a timer
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 relative' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};

export default Carousel;
