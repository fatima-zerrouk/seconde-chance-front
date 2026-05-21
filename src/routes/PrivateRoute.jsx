import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { isTokenValid } from '../utils/jwt.utils';

// composant qui protège les routes privées s'adapte aux rôles y a juste à préciser dans les routes
export default function PrivateRoute({ children, role }) {
  const { isAuthenticated } = useContext(AuthContext); //récupère isAuthenticated (booléen) et logout

  const token = localStorage.getItem('token'); // récupère token dans le localStorage

  if (!isAuthenticated || !isTokenValid(token)) {
    // vérifie si l'utilisateur est connecté ou si le token est valide/non expiré
    return <Navigate to="/login" />; //si user à pas de token va vers login
  }

  if (role) {
    // vérifie le rôle uniquement si un rôle est demandé
    const { role: userRole } = jwtDecode(token); // décode le token

    if (userRole !== role) {
      // si le rôle utilisateur ne correspond pas à celui demandé accès refusé
      return <Navigate to="/" />; // si user est connecté, mais n'a pas accès à cette route renvoie vers accueil
    }
  }
  // si utilisateur connecté, token valide, bon rôle affiche la page protégée
  return children;
}
