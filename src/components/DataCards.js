import { FaRegHeart } from 'react-icons/fa6';
import { LuShield } from 'react-icons/lu';
import { FiHome } from 'react-icons/fi';
import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
  PiNumberCircleFourFill,
} from 'react-icons/pi';
import { CiMail } from 'react-icons/ci';
import { BsTelephone, BsPinMap } from 'react-icons/bs';

export const dataMisson = [
  {
    id: 1,
    icon: FaRegHeart,
    title: 'Sauvetage',
    text: 'Nous recueillons les animaux abandonnés et leur offrons les soins nécessaires.',
  },
  {
    id: 2,
    icon: LuShield,
    title: 'Protection',
    text: 'Chaque animal reçoit un suivi médical complet et est identifié.',
  },
  {
    id: 3,
    icon: FiHome,
    title: 'Adoption',
    text: 'Nous accompagnons chaque famille pour trouver le compagnon idéal.',
  },
];

export const dataHow = [
  {
    id: 1,
    icon: PiNumberCircleOneFill,
    title: 'Découvrez',
    text: 'Parcourez notre catalogue et trouvez votre futur compagnon.',
  },
  {
    id: 2,
    icon: PiNumberCircleTwoFill,
    title: 'Contactez-nous',
    text: 'Prenez contact avec nous pour organiser une rencontre.',
  },
  {
    id: 3,
    icon: PiNumberCircleThreeFill,
    title: 'Rencontrez',
    text: "Faites connaissance avec l'animal dans notre refuge.",
  },
  {
    id: 4,
    icon: PiNumberCircleFourFill,
    title: 'Adoptez',
    text: "Finalisez l'adoption et accueillez votre nouveau compagnon.",
  },
];

export const dataContact = [
  {
    id: 1,
    icon: CiMail,
    title: 'Email',
    link: 'mailto:contact@seconde-chance.fr',
    text: 'contact@seconde-chance.fr',
  },
  {
    id: 2,
    icon: BsTelephone,
    title: 'Téléphone',
    link: 'tel:0123456789',
    text: '01 23 45 67 89',
  },
  {
    id: 3,
    icon: BsPinMap,
    title: 'Adresse',
    link: 'https://www.google.com/maps/place/H%C3%B4tel71/@45.7368557,4.8200765,17z/data=!3m1!4b1!4m6!3m5!1s0x47f4eb3c7c5a9b19:0xad4f12f554639cfb!8m2!3d45.7368557!4d4.8200765!16s%2Fg%2F11fl7dhr5p?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D',
    text: '71 quai Perrache, 69002 Lyon',
    target: 'blank',
  },
];

export const dataRules = [
  {
    id: 1,
    title: 'Un engagement à long terme',
    text: "Adopter un animal, c'est s'engager pour toute sa vie, soit 10 à 20 ans selon l'espèce. Cet engagement nécessite du temps, de l'amour et des ressources financières.",
    items: [
      "Réfléchissez à votre situation actuelle et future (déménagement, changement de travail, arrivée d'un enfant)",
      "Assurez-vous que tous les membres de votre foyer sont d'accord avec l'adoption",
      'Vérifiez que votre logement accepte les animaux de compagnie',
    ],
  },

  {
    id: 2,
    title: 'Santé et bien-être',
    text: 'Un animal nécessite des soins vétérinaires réguliers et une alimentation adaptée pour rester en bonne santé.',
    items: [
      'Visites vétérinaires annuelles et vaccinations obligatoires',
      "Budget mensuel pour la nourriture, les soins et les accessoires (environ 50-100€ selon l'animal)",
      "Prévoyance pour les frais vétérinaires d'urgence (assurance ou épargne)",
      "Stérilisation recommandée pour le bien-être de l'animal",
    ],
  },
  {
    id: 3,
    title: 'Un environnement adapté',
    text: "Chaque animal a des besoins spécifiques en termes d'espace et d'environnement.",
    items: [
      "Les chiens de grande taille nécessitent de l'espace et des promenades quotidiennes",
      "Les chats d'intérieur ont besoin d'enrichissement (arbres à chat, jouets, stimulation)",
      'Sécuriser votre logement (fenêtres, balcons, produits toxiques)',
      "Prévoir un espace dédié pour le repos et l'intimité de l'animal",
    ],
  },
  {
    id: 4,
    title: 'Temps et disponibilité',
    text: 'Un animal a besoin de votre présence et de votre attention au quotidien.',
    items: [
      'Les chiens nécessitent au minimum 2 sorties par jour, dont une longue promenade',
      "Les chats demandent du temps de jeu et d'interaction quotidien",
      'Prévoir une solution pour les vacances et absences (famille, pension, garde à domicile)',
      "Période d'adaptation de plusieurs semaines nécessaire",
    ],
  },
  {
    id: 5,
    title: 'Responsabilités légales',
    text: 'En tant que propriétaire, vous avez des obligations légales envers votre animal et la société.',
    items: [
      'Identification obligatoire par puce électronique ou tatouage',
      'Vaccination antirabique obligatoire pour les chiens (recommandée pour les chats)',
      'Assurance responsabilité civile pour couvrir les dommages causés par votre animal',
      "Respect du bien-être animal : interdiction de maltraitance et d'abandon",
    ],
  },
];
