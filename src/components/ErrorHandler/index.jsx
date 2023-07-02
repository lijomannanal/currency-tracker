import React from 'react';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';

const ErrorHandler = ({ error, resetErrorBoundary }) => (
  <div data-testid="error-alert" role="alert">
    <Typography variant='body1'>Something went wrong:</Typography>
    <pre>{error.message}</pre>
    <Button variant="outlined" onClick={resetErrorBoundary}>Try again</Button>
  </div>
);
export default ErrorHandler;