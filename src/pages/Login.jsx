import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { Field } from '../components/ui/Field.jsx';
import { ButtonTerracota } from '../components/ui/Buttons.jsx';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { apiFetch } = useFetch();
  const { login } = useContext(AuthContext); // fonction login du contexte
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      login(res.token);

      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setError('Erreur serveur');
    }
  };

  return (
    <section className="px-(--margin-mobile) py-26 bg-cream flex justify-center">
      <form
        onSubmit={handleSubmit}
        className=" rounded-(--radius-card) shadow-card w-100 h-106 bg-white p-8 lg:w-110 lg:h-110  md:h-110   "
      >
        <h1 className="title-h1 text-center font-semibold">Connexion</h1>

        <fieldset className="grid grid-cols-1 mt-6">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <Field
            type="text"
            placeholder="Entrer votre mail"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            name="email"
            id="email"
            required
            className="mb-6 mt-2 "
          />
          <label htmlFor="psw" className="font-medium">
            Mot de passe
          </label>
          <div className="relative">
            <Field
              type={showPassword ? 'text' : 'password'}
              placeholder="Entrer votre mot de passe"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              name="psw"
              id="psw"
              required
              className="mb-6 mt-2 w-full"
            />

            <div
              className="absolute  top-5 left-70 lg:left-84"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <LiaEyeSolid className="text-2xl " />
              ) : (
                <LiaEyeSlashSolid className="text-2xl" />
              )}
            </div>
          </div>
          <ButtonTerracota
            type="submit"
            value={'Se connecter'}
            className=" w-full lg:w-full mt-4"
          />
          {error && <p>{error}</p>} {/* METTRE ERREUR AILLEUR */}
        </fieldset>
      </form>
    </section>
  );
}
