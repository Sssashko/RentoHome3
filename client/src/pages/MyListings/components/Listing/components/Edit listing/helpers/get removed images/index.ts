// src/pages/.../helpers/getRemovedImages.ts
import { Image } from 'types';

const getRemovedImages = (
  images: (Image | File)[],
  initialImages: Image[]
) => {
  const removed = initialImages.filter(
    img => !images.find(i => !(i instanceof File) && i.url === img.url)
  );
  // !!! возвращаем ПОЛНЫЙ url
  return removed.map(({ url }) => url);
};

export default getRemovedImages;
