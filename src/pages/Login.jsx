import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { Field } from '../components/ui/Field.jsx';
import { ButtonTerracota } from '../components/ui/Buttons.jsx';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const navigate = useNavigate();
  const { apiFetch } = useFetch();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const handleSubmitForm = async formData => {
    try {
      const result = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // Si erreur validation
      if (result?.validationErrors) {
        result.validationErrors.forEach(({ path, msg }) => {
          // Mets l'erreur au bon champ
          setError(path, { message: msg });
        });
        return;
      }

      login(result.token);
      navigate('/dashboard/animals');
    } catch (error) {
      // Si l'erreur vient des identifiants, erreur 401 du back
      if (error.message === 'Identifiants incorrects') {
        setAuthError(error.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Connexion</title>
      </Helmet>

      <section className="px-(--margin-mobile) py-26 bg-cream flex-1 flex justify-center items-center">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="rounded-(--radius-card) shadow-card w-100 bg-white p-8 lg:w-110 h-auto transition-all duration-300 ease-in-out"
        >
          <h1 className="title-h1 text-center font-semibold">Connexion</h1>

          <fieldset className="grid grid-cols-1 mt-6">
            <legend className="sr-only">Forumalaire de connexion</legend>
            <label htmlFor="email" className="font-medium">
              Votre email
            </label>
            <Field
              type="text"
              placeholder="Entrer votre mail"
              id="email"
              className="mb-2 mt-2 "
              {...register('email', {
                required: "L'email est obligatoire.",
              })}
            />
            {errors.email && (
              <p className="text-red-700">{errors.email.message}</p>
            )}

            <label htmlFor="psw" className="font-medium mt-8">
              Votre mot de passe
            </label>
            <div className="relative flex items-center">
              <Field
                type={showPassword ? 'text' : 'password'}
                placeholder="Entrer votre mot de passe"
                id="psw"
                className="mb-2 mt-2 w-full"
                {...register('password', {
                  required: 'Le mot de passe est obligatoire.',
                })}
              />

              <button
                type="button"
                className="absolute right-6"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                aria-label={
                  showPassword
                    ? 'Masquer le mot de passe'
                    : 'Afficher le mot de passe'
                }
              >
                {showPassword ? (
                  <LiaEyeSolid className="text-2xl " />
                ) : (
                  <LiaEyeSlashSolid className="text-2xl" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}

            <ButtonTerracota
              type="submit"
              value={'Se connecter'}
              className=" w-full lg:w-full mt-8"
            />
            {authError && (
              <p className=" mt-4 sm text-center font-medium text-red-700">
                {authError}
              </p>
            )}
          </fieldset>
        </form>
      </section>
    </>
  );
}
