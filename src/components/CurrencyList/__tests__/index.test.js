import { render, screen } from '@testing-library/react';
import CurrencyList from '../index';
import { mockLiveCurrencyData } from "../../../utils/test/mockData";

describe('CurrencyList', () => {
    it('renders CurrencyList', () => {
        render(<CurrencyList data={mockLiveCurrencyData.quotes}/>);
        expect(screen.getByTestId('currency-list-container')).toBeInTheDocument();
        expect(screen.getAllByTestId(/currency-item/)).toHaveLength(3);
        expect(screen.getAllByTestId(/currency-label/)).toHaveLength(3);
        expect(screen.getAllByTestId(/currency-rate/)).toHaveLength(3);
        expect(screen.getByText('USD')).toBeInTheDocument();
        expect(screen.getByText('1.0931')).toBeInTheDocument();
        expect(screen.getByText('CAD')).toBeInTheDocument();
        expect(screen.getByText('1.4445')).toBeInTheDocument();
        expect(screen.getByText('HKD')).toBeInTheDocument();
        expect(screen.getByText('8.5595')).toBeInTheDocument();
    });

    
    it('should show empty currency list if the props passed is null', async () => {
        render(<CurrencyList data={null}/>);
        expect(screen.getByTestId('currency-list-container')).toBeInTheDocument();
        expect(screen.queryAllByTestId(/currency-item/)).toHaveLength(0);
        expect(screen.queryAllByTestId(/currency-label/)).toHaveLength(0);
        expect(screen.queryAllByTestId(/currency-rate/)).toHaveLength(0);
    });

});
