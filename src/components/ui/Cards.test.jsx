import { render, screen } from '@testing-library/react';
import { CardMission } from './Cards';
import { it, expect } from 'vitest';

// Mock simule une icône
const MockIcon = () => <div data-testid="mock-icon">Icône</div>;

it('Affiche le titre', () => {
  render(<CardMission icon={MockIcon} title="Mon titre" text="Mon texte" />);
  expect(screen.getByText('Mon titre')).toBeInTheDocument(); // toBeInTheDocument est un matcher il vérifie l'élément est présent
});

it('Affiche le texte', () => {
  render(<CardMission icon={MockIcon} title="Mon titre" text="Mon texte" />);
  expect(screen.getByText('Mon texte')).toBeInTheDocument();
});

it("Affiche l'icone", () => {
  render(<CardMission icon={MockIcon} title="Mon titre" text="Mon texte" />);
  expect(screen.getByTestId('mock-icon')).toBeInTheDocument(); //getByTestId trouve l'élément avec data-testid
});
