import React from 'react';
import OptimizedImage from '../components/ui/OptimizedImage';
import { ButtonTerracota } from '../components/ui/Buttons';
import { SectionSubtitles } from '../components/ui/Sections';
import { CardMission } from '../components/ui/Cards';
import { dataMisson } from '../components/DataCards';

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

        <div className="">
          <h1 className="title-h1 mb-8">
            <span className="font-medium block"> Offrez une </span>seconde
            chance <span className="font-medium block"> à un compagnon</span>
          </h1>

          <p className="m">
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
        <p className="md:inline-block">
          Seconde Chance œuvre chaque jour pour offrir une nouvelle vie aux
          <span className="inline-block">
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
    </>
  );
}
