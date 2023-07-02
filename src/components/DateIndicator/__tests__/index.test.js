import { render, screen } from '@testing-library/react';
import DateIndicator from '../index';

test('renders DateIndicator', () => {
  render(<DateIndicator date={`01-07-2023`}/>);
  expect( screen.getByTestId('date-indicator')).toBeInTheDocument();
  expect( screen.getByText('01-07-2023', { exact: false })).toBeInTheDocument();
});
