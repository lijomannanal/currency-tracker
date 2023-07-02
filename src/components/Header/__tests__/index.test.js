import { render, screen } from '@testing-library/react';
import Header from '../index';

test('renders Header', () => {
  render(<Header />);
  expect( screen.getByTestId('app-bar')).toBeInTheDocument();
  expect( screen.getByText('Currency Tracker')).toBeInTheDocument();
});
