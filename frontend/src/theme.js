import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Theme instance
// Themes stored in index.css for reference
const theme = createTheme({
  palette: {
    primary: {
      main: '#242526',
    },
    secondary: {
      main: '#e4ebf2',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;