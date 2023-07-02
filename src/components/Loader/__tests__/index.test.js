import { render, screen } from '@testing-library/react';
import Loader from '../index';

test('renders Loader', () => {
  render(<Loader />);
  expect( screen.getByTestId('circular-progress-loader')).toBeInTheDocument();
});
