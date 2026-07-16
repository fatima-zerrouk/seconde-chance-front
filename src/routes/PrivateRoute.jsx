import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { isTokenValid } from '../utils/jwt.utils';

export default function PrivateRoute({ children, role }) {
  const { isAuthenticated } = useContext(AuthContext);

  const token = localStorage.getItem('token');

  if (!isAuthenticated || !isTokenValid(token)) {
    // Vérifie si l'utilisateur est connecté et si le token est valide
    return <Navigate to="/login" />;
  }

  if (role) {
    // Vérifie le rôle
    const { role: userRole } = jwtDecode(token); // Décode le token

    if (userRole !== role) {
      // Si le rôle utilisateur ne correspond pas accès refusé
      return <Navigate to="/" />;
    }
  }
  // Si utilisateur affiche la page protégée
  return children;
}
