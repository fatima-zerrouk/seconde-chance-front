import { LinkTerracota } from '../components/ui/Buttons';

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-8 bg-cream text-center md:text-left">
      <div className="py-12 px-4 flex flex-col items-center md:items-start lg:mx-20">
        <h1 className="title-h1 mb-4">
          404 oups, cette page n&apos;existe pas
        </h1>

        <LinkTerracota
          to={'/'}
          value={"Retour à l'accueil"}
          ariaLabel={"Lien qui mène à l'accueil."}
          className="w-50 my-6"
        />
      </div>

      <img
        src="/assets/dalmatien.jpg"
        alt="Chien dalmatien"
        className="w-full md:w-100 h-auto"
      />
    </section>
  );
}
