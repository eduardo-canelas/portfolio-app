import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Eduardo Canelas/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders hero subtitle', () => {
  render(<App />);
  const subtitleElement = screen.getByText(/Full Stack Developer & Creative Technologist/i);
  expect(subtitleElement).toBeInTheDocument();
});

test('renders all main sections', () => {
  render(<App />);
  expect(screen.getByText(/About Me/i)).toBeInTheDocument();
  expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();
  expect(screen.getByText(/Let's Connect/i)).toBeInTheDocument();
});