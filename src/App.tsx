import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Home from './pages/home.tsx';

const Favorites = () => <Typography variant='h4'>Favoritos</Typography>;
const Details = () => <Typography variant='h4'>Detalles</Typography>;

function App() {
	return (
		<Container sx={{ mt: 4 }}>
			{/* Aquí irá tu Navbar luego */}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/favoritos' element={<Favorites />} />
				<Route path='/pokemon/:id' element={<Details />} />
			</Routes>
		</Container>
	);
}

export default App;
