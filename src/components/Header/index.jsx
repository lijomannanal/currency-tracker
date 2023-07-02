import { StyledAppBar } from './styles';
import Typography from '@mui/material/Typography';

const Header =  () => {
    return (
        <StyledAppBar position="static" color="primary" data-testid="app-bar">
            <Typography variant="subtitle1" noWrap component="div" sx={{ flexGrow: 1 }}>
                Currency Tracker
            </Typography>
        </StyledAppBar>
    );
};

export default Header;