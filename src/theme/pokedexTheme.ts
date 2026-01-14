import { createTheme } from '@mui/material';

export const pokedexTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#D32F2F',
		},
		secondary: {
			main: '#ECEFF1',
		},
		background: {
			default: '#050505',
			paper: '#151515',
		},
		text: {
			primary: '#FFFFFF',
			secondary: '#B0BEC5',
		},
	},
	typography: {
		fontFamily: '"Orbitron","Roboto", sans-serif',
		caption: {
			fontSize: '0.7rem',
			letterSpacing: '0.1rem',
		},
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: '18px',
					backgroundColor: '#1A1A1A',
					boxShadow: 'none',
					border: '1px solid #333',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#D32F2F',
					backgroundImage: 'linear-gradient(to right, #B71C1C, #D32F2F)',
				},
			},
		},
	},
});
