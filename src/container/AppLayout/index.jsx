import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from '../../components/Header';
import ErrorHandler from '../../components/ErrorHandler';
import { routes } from '../../routes';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Page } from './styles';

const AppLayout = () => (
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Header />
      <Page>
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          <Routes>
            {
              routes.map(({ path, component: Component }) => (
                <Route path={path} element={<Component />} key={path} />
              ))
            }

          </Routes>
        </ErrorBoundary>
      </Page>
    </LocalizationProvider>
  </ThemeProvider>
);

export default AppLayout;