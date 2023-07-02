import { useState, useMemo, useEffect, useCallback } from 'react';
import DateIndicator from "../DateIndicator";
import { Row, StyledDatePicker } from './styles';
import dayjs from 'dayjs';
import CurrencyList from '../CurrencyList';
import api from '../../service/api';
import { CURRENCIES, CURRENCY_LIVE_URL, CURRENCY_HISTORICAL_URL, SOURCE_CURRENCY } from '../../constants';
import useLoader from '../../hooks/useLoader';
import Loader from '../Loader';
import ErrorHandler from '../ErrorHandler';

const Home = () => {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const [ date, setDate] = useState(currentDate);
    const [ currencyData, setCurrencyData] = useState(null);
    const [error, setError] = useState();
    const { isLoading, showLoader, hideLoader } = useLoader();

    const [dateInput, selectedDate] = useMemo(() => {
        return [dayjs(date), dayjs(date).format('DD-MM-YYYY')];
     }, [ date]);

    const getLiveCurrencyRates = useCallback(async () => {
     showLoader();
     const queryString = `?source=${SOURCE_CURRENCY}&currencies=${CURRENCIES.join(',')}`;
     const data = await api.get(`${CURRENCY_LIVE_URL}${queryString}`);
     setCurrencyData(data.quotes);
     hideLoader();
    }, [showLoader, hideLoader]);

    const getHistoricalCurrencyRates = useCallback(async () => {
         showLoader();
         const queryString = `?date=${date}&source=${SOURCE_CURRENCY}&currencies=${CURRENCIES.join(',')}`;
         const data = await api.get(`${CURRENCY_HISTORICAL_URL}${queryString}`);
         setCurrencyData(data.quotes);
         hideLoader();
        }, [showLoader, hideLoader, date]);

    useEffect(() => {
        const apiToCall = date === currentDate ? getLiveCurrencyRates: getHistoricalCurrencyRates;
        apiToCall().catch((err) => {
            setCurrencyData(null);
            setError(err);
            hideLoader();
          });
    }, [date, currentDate, getLiveCurrencyRates, hideLoader, getHistoricalCurrencyRates]);


    const onDateSelect = (newValue) => {
        setDate(newValue.format("YYYY-MM-DD"));
    }

    const reloadPage = () => {
        document.location.reload();
    };

    return (
        <>
            <Row data-testid="date-row">
                <DateIndicator date={selectedDate}/>
                <StyledDatePicker
                    margin="normal"
                    disableFuture
                    format="DD-MM-YYYY"
                    value={dateInput}
                    onAccept={onDateSelect}
                    slotProps={{ textField: { readOnly: true } }}
                />
            </Row>
            { isLoading ?  <Loader />: (
                <>
                { error ?  <ErrorHandler error={error} resetErrorBoundary={reloadPage} />:  <CurrencyList data={currencyData}/>}
                </>
            )}
        </>
    );
}

export default Home;