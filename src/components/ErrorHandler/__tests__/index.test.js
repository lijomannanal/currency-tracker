import { fireEvent, render, screen } from '@testing-library/react';
import ErrorHandler from '../index';

describe('ErrorHandler', () => {
    
    const mockProps = {
        error: {
            message: "test error"
        },
        resetErrorBoundary: jest.fn()
    }

    it('renders ErrorHandler', () => {
        render(<ErrorHandler {...mockProps}/>);
        expect( screen.getByTestId('error-alert')).toBeInTheDocument();
        expect( screen.getByText('test error')).toBeInTheDocument();
        expect( screen.getByText('Try again')).toBeInTheDocument();
    });

    
    it('should invoke props callback upon \'Try again\' button click', async () => {
        render(<ErrorHandler {...mockProps}/>);
        const retryButton = await screen.findByText('Try again');
        fireEvent.click(retryButton);
        expect(mockProps.resetErrorBoundary).toHaveBeenCalledTimes(1);
    });

});
