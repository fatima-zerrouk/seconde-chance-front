import React, { useState } from 'react';
import { optimizeCloudinaryUrl } from '../../utils/cloudinary';

export default function Carousel({ animal }) {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <>
      <div>
        <figure className="">
          <img
            alt={`Photo de ${animal.name}`}
            src={optimizeCloudinaryUrl(animal.urls[imgIndex], 900)}
            className="w-full h-60 md:w-130 md:h-80  object-cover rounded-(--radius-card)"
          ></img>
        </figure>
        <div className="flex flex-row justify-between gap-4 ">
          {animal.urls.map((url, index) => (
            <button
              key={index}
              onClick={() => setImgIndex(index)}
              className={`border-2 rounded-(--radius-button) overflow-hidden mt-4 mb-6  ${
                index === imgIndex ? 'border-terracotta' : 'border-transparent'
              }`}
            >
              <img
                src={optimizeCloudinaryUrl(url, 250)}
                alt={`Miniature ${index + 1}`}
                className="w-26 h-26 md:w-36 md:h-26 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
