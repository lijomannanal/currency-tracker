import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export const CurrencyListContainer = styled(Grid)`
    margin: 1rem -1rem;
`;

export const CurrencyItemContainer = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: '1px solid rgb(208, 215, 222)'
}));

export const Currency = styled(Grid)`
    width: 250px;
`;
export const Label = styled('div')`
    justify-content: center;
    background-color: #d3d3d357;
    padding: 0.5rem;
    font-size: 1rem;
    font-weight:600;

`;
export const Rate = styled('div')`
    justify-content: center;
    background-color: #d3d3d303;
    padding: 0.5rem;
    font-size: 1.25rem;
    font-weight:700;
`;

