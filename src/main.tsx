import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import { pokedexTheme } from './theme/pokedexTheme.ts';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<FavoritesProvider>
			<ThemeProvider theme={pokedexTheme}>
				<BrowserRouter>
					<CssBaseline />
					<App />
				</BrowserRouter>
			</ThemeProvider>
		</FavoritesProvider>
	</StrictMode>,
);
