# Seconde Chance — front-end

> Application web dédiée à la mise en relation entre des animaux (chats et chiens) à l'adoption et des adoptants potentiels.  
> **Projet présenté dans le cadre de la validation du titre RNCP Développeur Web et Web Mobile (DWWM).**

---

## Présentation du projet

**Seconde Chance** simplifie le processus d'adoption responsable en connectant le refuge avec les futurs adoptants.

### Personas ciblés
1. **L'adoptante mobile (visiteuse) :** Souhaite parcourir facilement le catalogue d'animaux depuis son smartphone, filtrer selon ses critères (espèce, âge, statut) et contacter l'association rapidement.
2. **L'administrateur non-technique :** A besoin d'une interface simple, claire et sécurisée pour gérer les fiches d'animaux (ajout, modification, suppression, statut d'adoption).

---

## Fonctionnalités principales

- **Page d'accueil :** Présentation du projet et appel à l'action.
- **Catalogue d'animaux :**
  - Affichage sous forme de cartes d'animaux.
  - Filtres dynamiques (espèce, statut, etc.).
- **Fiche détaillée :** Galerie de l'animal, caractéristiques, histoire et informations de contact.
- **Conditions d'adoption :** Informations, démarches et conseils de sensibilisation.
- **Espace administration sécurisé (dashboard) :**
  - Authentification par Token JWT.
  - Dashboard ergonomique adapté aux utilisateurs non-techniques.
  - Formulaires d'ajout / modification avec upload d'images.
  - Interface gestion des animaux et du statut (`disponible`, `en cours d'adoption`, `adopté`).

---

## 🛠️ Stack Technique

- **Framework / UI :** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling :** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routage :** [React Router v7](https://reactrouter.com/) & [react-router-hash-link](https://github.com/ncoughlin/react-router-hash-link)
- **Gestion des formulaires :** [React Hook Form](https://react-hook-form.com/)
- **Notifications / UI :** [Sonner](https://sonner.emilkowal.si/) (Toasts) & [React Icons](https://react-icons.github.io/react-icons/)
- **Gestion JWT & SEO :** `jwt-decode`, `react-helmet-async`
- **Tests et quality :** [Vitest](https://vitest.dev/), Testing Library, ESLint, Prettier

---

## Installation et lancement local

### Prérequis
- **Node.js** (v18 ou supérieur)
- **npm** (inclus avec Node)
- Le serveur back-end [`seconde-chance-back`](https://github.com/fatima-zerrouk/seconde-chance-back) en cours d'exécution.

### 1. Cloner le projet
```bash
git clone [https://github.com/fatima-zerrouk/seconde-chance-front.git](https://github.com/fatima-zerrouk/seconde-chance-front.git)
cd seconde-chance-front
```

### 2. Variables d'environnement
Créez un fichier `.env` à la racine du projet (sur le modèle du fichier exemple) :
```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Installer les dépendances
```bash
npm install
```

### 4. Lancer en mode développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

---

## Scripts Disponibles

- `npm run dev` : Lance le serveur de développement Vite.
- `npm run build` : Compile le projet pour la production.
- `npm run preview` : Prévisualise le build de production localement.
- `npm run test` : Exécute les tests unitaires et d'intégration avec **Vitest**.
- `npm run lint` : Vérifie le code avec **ESLint**.
- `npm run lint:fix` : Corrige automatiquement les erreurs de linting.
- `npm run format` : Formate tout le code avec **Prettier**.

---

## Auteur

- **Fatima Zerrouk** - *Développeuse web full-stack* 
