import { render, screen, waitForElementToBeRemoved, fireEvent  } from '@testing-library/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';
import Home from '../index';
import theme from '../../../container/AppLayout/theme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import api from '../../../service/api';
import * as hooks from '../../../hooks/useLoader';
import { mockLiveCurrencyData } from "../../../utils/test/mockData";
import { SOURCE_CURRENCY, CURRENCIES } from '../../../constants';
import dayjs from 'dayjs';

const renderWithProviders = (Component) => {
    render(
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
             <Component/>
            </LocalizationProvider>
        </ThemeProvider>
    )
}

describe('Home Component', () => {  
    jest.mock("@mui/x-date-pickers", () => {
        return {
        DatePicker: jest.requireActual("@mui/x-date-pickers").DesktopDatePicker,
        };
    });

    const apiGetSpy = jest.spyOn(api, 'get');
    jest.mock("@mui/x-date-pickers", () => {
        return {
          DatePicker: jest.requireActual("@mui/x-date-pickers").DesktopDatePicker,
        };
      });

    afterEach(() => {    
        jest.clearAllMocks();
      });

    it('renders Home component', async () => {
        apiGetSpy.mockReturnValue(mockLiveCurrencyData);
        renderWithProviders(Home);
        expect( screen.getByTestId('date-row')).toBeInTheDocument();
        expect( screen.getByTestId('date-indicator')).toBeInTheDocument();
        expect( screen.getByTestId('CalendarIcon')).toBeInTheDocument();
        expect(apiGetSpy).toHaveBeenCalledTimes(1);
        expect(apiGetSpy).toHaveBeenCalledWith(`/live?source=${SOURCE_CURRENCY}&currencies=${CURRENCIES.join(',')}`);
        await waitForElementToBeRemoved(screen.queryByTestId("circular-progress-loader"));
      });

      it('should show loader if the api is in loading state', async () => {
        const useLoaderSpy = jest.spyOn(hooks, 'default');
        apiGetSpy.mockReturnValue(mockLiveCurrencyData);
        useLoaderSpy.mockReturnValue({
          isLoading: true,
          showLoader: jest.fn(),
          hideLoader: jest.fn(),
        });
        renderWithProviders(Home);
        expect( screen.getByTestId('date-row')).toBeInTheDocument();
        expect( screen.getByTestId('date-indicator')).toBeInTheDocument();
        expect( screen.getByTestId('CalendarIcon')).toBeInTheDocument();
        expect(apiGetSpy).toHaveBeenCalledTimes(1);
        expect(apiGetSpy).toHaveBeenCalledWith(`/live?source=${SOURCE_CURRENCY}&currencies=${CURRENCIES.join(',')}`);
        await screen.findByTestId('circular-progress-loader');
        expect(screen.getByTestId('circular-progress-loader')).toBeInTheDocument();
        useLoaderSpy.mockRestore();
      });

      it('should show error message if the api throws error', async () => {
        apiGetSpy.mockRejectedValue(new Error('Failed to fetch'));
        renderWithProviders(Home);
        expect( screen.getByTestId('date-row')).toBeInTheDocument();
        expect( screen.getByTestId('date-indicator')).toBeInTheDocument();
        expect( screen.getByTestId('CalendarIcon')).toBeInTheDocument();
        expect(apiGetSpy).toHaveBeenCalledTimes(1);
        expect(apiGetSpy).toHaveBeenCalledWith(`/live?source=${SOURCE_CURRENCY}&currencies=${CURRENCIES.join(',')}`);
        await waitForElementToBeRemoved(screen.queryByTestId("circular-progress-loader"));
        expect(screen.queryByTestId('circular-progress-loader')).not.toBeInTheDocument();
        await screen.findByTestId('error-alert');
        expect(screen.getByTestId('error-alert')).toBeInTheDocument();
        expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
      });
      
      it('should invoke historical api upon date change', async () => {
        const dateInput = new Date();
        dateInput.setMonth(dateInput.getMonth() - 1);
        const dateToPick = 28;
        dateInput.setDate(dateToPick);
        apiGetSpy.mockReturnValue(mockLiveCurrencyData);
        renderWithProviders(Home);
        expect( screen.getByTestId('date-row')).toBeInTheDocument();
        expect( screen.getByTestId('date-indicator')).toBeInTheDocument();
        expect( screen.getByTestId('CalendarIcon')).toBeInTheDocument();
        await waitForElementToBeRemoved(screen.queryByTestId("circular-progress-loader"));
        const datePicker = screen.getByRole('textbox');
        const button = await screen.findByRole('button');
        fireEvent.click(button);
        await screen.findByRole('dialog');
        const leftArrow = await screen.findByTestId('ArrowLeftIcon');
        fireEvent.click(leftArrow);
        fireEvent.click(await screen.findByText(dateToPick.toString()));
        const selectedDate = dayjs(dateInput).format('DD-MM-YYYY')
        expect(datePicker.value).toBe(selectedDate); 
        expect(apiGetSpy).toHaveBeenCalledTimes(2);
        expect(apiGetSpy).toHaveBeenLastCalledWith(`/historical?date=2023-06-28&source=${SOURCE_CURRENCY}&currencies=${CURRENCIES.join(',')}`);
        await waitForElementToBeRemoved(screen.queryByTestId("circular-progress-loader"));
        expect(screen.queryByTestId('circular-progress-loader')).not.toBeInTheDocument();
      });

      it('should display all the currencies with rates from the api response', async () => {
        apiGetSpy.mockReturnValue(mockLiveCurrencyData);
        renderWithProviders(Home);
        expect( screen.getByTestId('date-row')).toBeInTheDocument();
        expect( screen.getByTestId('date-indicator')).toBeInTheDocument();
        expect( screen.getByTestId('CalendarIcon')).toBeInTheDocument();
        await waitForElementToBeRemoved(screen.queryByTestId("circular-progress-loader"));
        expect(screen.getByTestId('currency-list-container')).toBeInTheDocument();
        expect(screen.getAllByTestId(/currency-item/)).toHaveLength(3);
        expect(screen.getAllByTestId(/currency-label/)).toHaveLength(3);
        expect(screen.getAllByTestId(/currency-rate/)).toHaveLength(3);
      });
    });