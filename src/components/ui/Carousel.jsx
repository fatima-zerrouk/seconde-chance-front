import React, { useState } from 'react';

export default function Carousel({ animal }) {
  const [imgIndex, setImgIndex] = useState(0);

  const optimizeCloudinaryUrl = url => {
    if (!url)
      return 'https://cdn.phototourl.com/free/2026-07-16-68b65eb2-6d21-4c71-a9a7-4e251506c9b1.png';

    // Si c'est une URL Cloudinary, injecte les paramètres d'optimisation
    if (url.includes('cloudinary.com')) {
      return url.replace('/upload/', '/upload/f_auto,q_auto,w_auto,c_scale/');
    }

    return url;
  };

  return (
    <>
      <div>
        <figure className="">
          <img
            alt={`Photo de ${animal.name}`}
            src={optimizeCloudinaryUrl(animal.urls[imgIndex], 600)}
            className="w-full h-60  md:w-140 md:h-110  object-cover rounded-(--radius-card)"
          ></img>
        </figure>
        <div className="flex flex-row justify-between md:justify-start gap-4">
          {animal.urls.map((url, index) => (
            <button
              key={index}
              onClick={() => setImgIndex(index)}
              className={`border-2 rounded-(--radius-button) overflow-hidden mt-4 mb-6  ${
                index === imgIndex ? 'border-terracotta' : 'border-transparent'
              }`}
            >
              <img
                src={optimizeCloudinaryUrl(url, 100)}
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
