import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ButtonTerracota } from '../ui/Buttons';
import AnimalIdentityFields from './AnimalFormIdentityFields';
import AnimalDescriptionField from './AnimalFormDescriptionField';
import AnimalGalleryField from './AnimalFormGalleryField';

export default function AnimalForm({
  onSubmit,
  animalEdit,
  isLoading = false,
}) {
  const navigate = useNavigate();
  const isEdit = Boolean(animalEdit);

  const methods = useForm({
    mode: 'onTouched',
    defaultValues: animalEdit,
  });

  const interceptedSubmit = data => {
    onSubmit(data, { setError: methods.setError });
  };

  return (
    <section>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(interceptedSubmit)}
          className="rounded-(--radius-card) shadow-card mb-12 bg-lin p-8 w-full h-auto transition-all duration-300 ease-in-out"
        >
          <fieldset>
            <legend className="sr-only">
              {isEdit ? "Modifier l'animal" : 'Ajouter un animal'}
            </legend>
            <AnimalIdentityFields />
          </fieldset>

          <AnimalDescriptionField />
          <AnimalGalleryField />

          <div className="flex flex-col md:flex-row gap-6 justify-end mt-12">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => navigate('/dashboard/animals')}
              className="mt-8 md:mt-0 w-full md:w-60 h-14 font-medium rounded-(--radius-button) border-[1.4px] hover:bg-brown hover:border-0 hover:text-lin border-brown cursor-pointer"
            >
              Annuler
            </button>
            <ButtonTerracota
              type="submit"
              disabled={isLoading}
              value={isEdit ? 'Modifier' : 'Ajouter'}
              className="w-full md:w-60 mt-4 md:mt-0"
            />
          </div>
        </form>
      </FormProvider>
    </section>
  );
}
