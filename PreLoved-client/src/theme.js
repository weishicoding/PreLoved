
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: 'rgb(255, 215, 104)',
			white: 'white',
			lightGray: "#e5e7eb" 
		},
		secondary: {
			main: 'rgb(0, 113, 178)'
		},
		dark: {
			main: '#000'
		}
	},
	spacing: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50], // default specing default
	breakpoints: {
		
	},
	typography: {
    fontFamily: 'Roboto',
		button: {
			fontSize: 16,
			fontWeight: 700
		}
  },
});

export default theme;