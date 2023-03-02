
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// export const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['Helvetica', 'Arial', 'sans-serif'],
// });



// Create a theme instance.
const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#0082FF',
    },
    secondary: {
      main: '#9C27B0',
    },
    error: {
      main: red.A400,
    },
    info: {
      main: '#2196F3'
    }
  },
});

export default muiTheme;