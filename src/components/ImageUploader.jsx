import React, { useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { ImCross } from 'react-icons/im';
import { useFetch } from '../hooks/useFetch.js';

export function ImageUploader({
  onUploadSuccess,
  onRemove,
  currentUrl,
  index, // Pour connaitre l'emplacement dans le tableau 0, 1 ou 2
  animalAlt = "l'animal" // Valeur par défaut de alt
}) {
  const { apiFetch } = useFetch();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const processFile = async file => {
    if (!file) return; // Vérifie qu'un fichier existe
    setLoading(true);
    setErrorMsg('');

    // Validation taille
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Fichier trop lourd (5 Mo maximum)');
      setLoading(false);
      return;
    }
    // Validation format
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']; // VALIDATION FORMAT
    if (!allowedTypes.includes(file.type)) {
      setErrorMsg('Format invalide. Autorisé : JPG, PNG, WEBP');
      setLoading(false);
      return;
    }

    const formData = new FormData(); // Permet d'envoyer une image
    formData.append('image', file); // 'image' fait écho à uploadMiddleware.single('image') dans le back

    try {
      // Requête vers back
      const response = await apiFetch('/animals/upload', {
        method: 'POST',
        body: formData,
      });

      onUploadSuccess(response.url); // Transmet l'URL au formulaire parent
    } catch (error) {
      console.error("Erreur d'upload", error);
      setErrorMsg(error.message); // Stocke le message d'erreur pour l'affichage
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  // Pour déposer l'image
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  const inputId = `Sélectionnez une image-${index}`;

  return (
    <div className="flex justify-center">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border rounded-(--radius-input) flex flex-col items-center justify-center h-60 w-70  transition-all
         bg-white`}
      >
        {loading ? (
          <p className="font-medium animate-pulse p-2">
            Optimisation en cours...
          </p>
        ) : currentUrl ? ( // Affiche l'aperçu image
          <div className="w-full h-full relative">
            <img
              src={currentUrl}
              alt={`Photo ${index + 1} de ${animalAlt}`}
              className="h-full w-full object-cover rounded-(--radius-input)"
            />
            <button
              type="button" // Évite de soumettre le formulaire entier au clic
              onClick={onRemove} // Appelle la fonction de suppression passée par le parent
              className="absolute top-2 right-2 bg-terracotta rounded-xl p-2 cursor-pointer hover:bg-brown hover:text-lin transition ease-in-out duration-300"
              title="Supprimer l'image"
            >
              <ImCross className="text-xl font-bold" />
            </button>
          </div>
        ) : (
          <div className="">
            <label
              htmlFor={inputId}
              className="mt-2 text-sm text-center cursor-pointer flex flex-col items-center p-4"
            >
              <MdOutlineFileUpload className="text-3xl text-terracotta mb-4 w-14 h-auto p-2 rounded-4xl bg-[#FBF3F0]" />
              Glissez-déposez votre image ici, ou{' '}
              <span className="block hover:text-[#A6573F] font-medium hover:transition ease-in-out duration-200">
                {' '}
                parcourez vos fichiers{' '}
              </span>
            </label>

            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={e => processFile(e.target.files[0])}
              className="hidden"
              id={inputId}
            />
            {errorMsg && (
              <p className="text-red-700 text-sm text-center font-medium p-4">
                {errorMsg}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
