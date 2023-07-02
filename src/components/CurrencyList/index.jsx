import { CurrencyListContainer, CurrencyItemContainer, Currency, Label, Rate } from './styles';
import Divider from '@mui/material/Divider';
import { SOURCE_CURRENCY } from '../../constants';

const CurrencyList =  ({ data }) => {
    return (
        <CurrencyListContainer data-testid="currency-list-container" container spacing={4}>
            { data ? Object.keys(data).map(currency => {     
                    return (
                        <Currency item key={currency} data-testid={`currency-item-${currency}`}>
                            <CurrencyItemContainer>
                                <Label data-testid={`currency-label-${currency}`}>
                                    {currency.replace(SOURCE_CURRENCY, '')}
                                </Label>
                                <Divider />
                                <Rate data-testid={`currency-rate-${currency}`}>
                                {data[currency]?.toFixed(4)}
                                </Rate>
                            </CurrencyItemContainer>          
                        </Currency>
                    )  
                 }): null
            }

        </CurrencyListContainer>
    )
};

export default CurrencyList;