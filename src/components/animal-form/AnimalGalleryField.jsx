import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FaStarOfLife } from 'react-icons/fa6';
import { ImageUploader } from '../ImageUploader';

export default function AnimalGalleryField() {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    register('urls', {
      validate: value => {
        const trueImages = value ? value.filter(Boolean) : [];
        return trueImages.length >= 1 || 'Il faut au moins une photo';
      },
    });
  }, [register]);

  const animalAltForm = useWatch({ control, name: 'name' }) || "l'animal";
  const currentUrls = useWatch({ control, name: 'urls' }) || [];

  const handleImageUploaded = (index, url) => {
    const newUrls = [...currentUrls];
    newUrls[index] = url;
    setValue('urls', newUrls, { shouldValidate: true });
  };

  const handleImageRemoved = index => {
    const newUrls = [...currentUrls];
    newUrls[index] = undefined;
    setValue('urls', newUrls, { shouldValidate: true });
  };

  return (
    <>
      <p className="font-medium mt-6 flex flex-row gap-4">
        Galerie <FaStarOfLife className="text-red-700 w-2 h-auto" />
      </p>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-7 mb-6">
        {[0, 1, 2].map(index => (
          <ImageUploader
            key={index}
            index={index}
            currentUrl={currentUrls[index]}
            animalAlt={animalAltForm}
            onUploadSuccess={url => handleImageUploaded(index, url)}
            onRemove={() => handleImageRemoved(index)}
          />
        ))}
      </div>
      {errors.urls && (
        <p className="text-red-700 mb-8">{errors.urls.message}</p>
      )}
    </>
  );
}
