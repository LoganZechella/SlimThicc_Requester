import { render, screen } from '@testing-library/react';
import App from './App';

test('renders song request app', () => {
  render(<App />);
  // Update this to match actual text in your app
  const element = screen.getByText(/song request/i);
  expect(element).toBeInTheDocument();
});
