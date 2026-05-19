import React from 'react';
import OptimizedImage from '../components/ui/OptimizedImage';
import { ButtonTerracota } from '../components/ui/Buttons';
import { SectionSubtitles } from '../components/ui/Sections';
import { CardMission } from '../components/ui/Cards';
import { dataMisson } from '../components/DataCards';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

export default function Home() {
  return (
    <>
      {/* Section hero */}
      <section className="flex flex-col justify-between pb-16 md:pb-10 lg:flex-row-reverse items-center bg-lin px-(--margin-mobile) md:px-(--margin-desktop)">
        <OptimizedImage
          src="src/assets/dog-home.png"
          alt="Photo bannière d'un chien marron dans un drap"
          width="910"
          height="1820"
          lazy={false}
          fetchPriority="high"
          className="lg:mr-80 w-full max-w-60 md:max-w-66 h-auto"
        />

        <div>
          <h1 className="title-h1 mb-8">
            <span className="font-medium block"> Offrez une </span>seconde
            chance <span className="font-medium block"> à un compagnon</span>
          </h1>

          <p>
            Chaque animal mérite un foyer aimant. Découvrez nos{' '}
            <span className="inline-block">
              chiens et chats qui attendent une famille.
            </span>
          </p>

          <div className="sm:flex gap-6">
            <ButtonTerracota
              type="submit"
              value={'Découvrez nos animaux'}
              className=" w-full md:w-62 mt-8"
            />
            <button
              id="adopt"
              className="mt-8 h-14 font-medium rounded-(--radius-button) border-2  hover:bg-brown hover:border-0 hover:text-lin transition duration-300 ease-in-out w-full md:w-52 border-terracotta cursor-pointer"
            >
              Comment adopter
            </button>
          </div>
        </div>
      </section>

      {/* Section mission */}
      <SectionSubtitles title={'Notre mission'}>
        <p>
          Seconde Chance œuvre chaque jour pour offrir une nouvelle vie aux
          <span className="md:inline-block">
            {' '}
            animaux abandonnés et les reconnecter avec des familles aimantes.
          </span>
        </p>
        {/* contenue children */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-12 ">
          {dataMisson.map(card => (
            <CardMission
              key={card.id}
              icon={card.icon}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </SectionSubtitles>

      {/* Section adoption */}
      <section className="bg-lin flex flex-col m-auto gap-12 lg:flex-row md:items-center md:justify-between px-(--margin-mobile) md:px-(--margin-desktop) py-12">
        <div className="">
          <h2 className="title-h2">L&apos;adoption responsable</h2>
          <p className="pb-2 pt-4">
            Adopter un animal est un engagement à long
            <span className="block">
              terme qui demande réflexion, temps et ressources.
            </span>
          </p>

          <p className="flex my-4 gap-2">
            <IoMdCheckmarkCircleOutline className="text-terracotta text-3xl" />
            Un engagement de 10 à 20 ans selon l&apos;espèce
          </p>
          <p className="flex gap-2">
            <IoMdCheckmarkCircleOutline className="text-terracotta text-3xl" />
            Des frais vétérinaires et d&apos;entretien réguliers
          </p>
          <p className="flex my-4 gap-2">
            <IoMdCheckmarkCircleOutline className="text-terracotta text-3xl" />
            Du temps quotidien pour le bien-être de l&apos;animal
          </p>
          <p className="flex gap-2">
            <IoMdCheckmarkCircleOutline className="text-terracotta text-3xl" />
            Un environnement adapté à ses besoins
          </p>
        </div>

        <OptimizedImage
          src="src/assets/dog-cat.jpeg"
          alt="Photo d'un chien et d'un chat côte à côte sur l'herbe"
          width="2896"
          height="1704"
          lazy={true}
          fetchPriority="low"
          className="rounded-(--radius-card) my-8 w-full sm:max-w-100 lg:max-w-120 "
        />
      </section>
    </>
  );
}
