import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import Login from './Login';
import { AuthContext } from '../context/AuthContext';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const mockApiFetch = vi.fn();

// Vitest remplace les vrais modules (hooks) par les fonctions mocks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../hooks/useFetch', () => ({
  useFetch: () => ({ apiFetch: mockApiFetch }),
}));

describe("Test d'intégration page Login", () => {
  // Recréer l'environnement du composant Logina vec AuthContext et routeur
  const renderLogin = () => {
    return render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  it('Affiche les champs du formulaire', () => {
    renderLogin(); // Affiche le composant dans l'environnement simuler
    // Vérifie que ce qu'il y a sur l'écran correspond
    expect(screen.getByLabelText(/Votre email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Votre mot de passe/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Se connecter/ })
    ).toBeInTheDocument();
  });

  it('Valide le formulaire et affiche les erreurs si les champs sont vides', async () => {
    renderLogin();

    // Récupère le bouton
    const submitButton = screen.getByRole('button', { name: /Se connecter/ });

    // Simule le clic
    fireEvent.click(submitButton);

    // Attends et vérifie que Login / RHF ont bien communiqué
    await waitFor(() => {
      expect(screen.getByText("L'email est obligatoire.")).toBeInTheDocument();
      expect(
        screen.getByText('Le mot de passe est obligatoire.')
      ).toBeInTheDocument();
    });
  });
});
