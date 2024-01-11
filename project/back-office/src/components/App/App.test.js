import { render, screen } from '@testing-library/react';
import App from './App';

test('Render Connexion title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Connexion/i);
  expect(titleElement).toBeInTheDocument();
});

test('Render Email label', () => {
  render(<App />);
  const emailLabel = screen.getByLabelText(/Email/i);
  expect(emailLabel).toBeInTheDocument();
});

test('Render Mot de passe label', () => {
  render(<App />);
  const passwordLabel = screen.getByLabelText(/Mot de passe/i);
  expect(passwordLabel).toBeInTheDocument();
});
