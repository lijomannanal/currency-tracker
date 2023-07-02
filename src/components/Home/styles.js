import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';

export const Row = styled('div')`
display: flex;
justify-content: space-between;
align-items: center;
`;

export const StyledDatePicker = styled(DatePicker)`
> div {
    height: 2.5rem;
}
`;