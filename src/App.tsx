import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import Home from './pages/Home.tsx';
import NavBar from './components/NavBar.tsx';
import Details from './pages/Details.tsx';
import Favorites from './pages/Favorites.tsx';

function App() {
	return (
		<Box>
			{/*<Container sx={{ mt: 4 }}> */}
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/favorites' element={<Favorites />} />
				<Route path='/pokemon/:id' element={<Details />} />
			</Routes>
			{/* </Container> */}
		</Box>
	);
}

export default App;
