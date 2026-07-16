import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { isTokenValid } from '../utils/jwt.utils.js';
import { toast } from 'sonner';

export function AuthProvider({ children }) {
  //children composant enfant à qui les données vont être transmises
  const storedToken = localStorage.getItem('token');

  if (storedToken && !isTokenValid(storedToken)) {
    //si y a un token, mais qu'il n'est pas valide
    localStorage.removeItem('token'); //supprime du local storage
  }
  // initalise unn état true ou false
  const [isAuthenticated, setIsAuthenticated] = useState(
    // state qui stocke si l'utilisateur est connecté ou non
    !!storedToken && isTokenValid(storedToken) // !! transforme la valeur en booléen si token true, si pas token false
  );

  function login(token) {
    localStorage.setItem('token', token); // stocke le token dans localStorage
    setIsAuthenticated(true); // utilisateur connecté
  }

  // fonction appelée à la déconnexion
  function logout() {
    localStorage.removeItem('token'); // supprime le token du localStorage
    setIsAuthenticated(false); // utilisateur déconnecté
    toast.success('Vous avez bien été déconnecté');
  }

  return (
    // Provider partage les données à tous les composants enfants
    <AuthContext.Provider
      value={{
        isAuthenticated, // booléen de connexion
        // fonction login et logout accessible partout
        login,
        logout,
      }}
    >
      {children} {/* transmet login, logout, isAuthenticated aux enfants*/}
    </AuthContext.Provider>
  );
}
