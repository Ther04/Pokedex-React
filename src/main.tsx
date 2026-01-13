import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { FavoritesProvider } from './context/FavoritesContext.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<FavoritesProvider>
			<BrowserRouter>
				<CssBaseline />
				<App />
			</BrowserRouter>
		</FavoritesProvider>
	</StrictMode>,
);
