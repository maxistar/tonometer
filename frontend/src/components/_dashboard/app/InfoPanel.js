import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.primary.darker,
    backgroundColor: theme.palette.primary.lighter
}));

export default function InfoPanel(props) {
    return (
        <RootStyle>
            <Typography variant="h3">{props.value}</Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                {props.label}
            </Typography>
        </RootStyle>
    );
}
