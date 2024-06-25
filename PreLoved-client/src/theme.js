
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(255, 215, 104)'
		},
		secondary: {
			main: 'rgb(0, 113, 178)'
		},
		dark: {
			main: '#000'
		}
	},
	spacing: 8, // default specing default
	breakpoints: {
		
	},
	typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;