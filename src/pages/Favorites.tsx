import { CatchingPokemon } from '@mui/icons-material';
import { Button, Container, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';
import { PokemonCard } from '../components/PokemonCard';
const Favorites = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const { favorites } = useFavorites();
	if (favorites.length === 0) {
		return (
			<Container maxWidth='md' sx={{ textAlign: 'center', mt: 8 }}>
				<CatchingPokemon sx={{ fontSize: 100, color: 'text.secondary', mb: 2 }}></CatchingPokemon>
				<Typography variant='h5' color='text.secondary' gutterBottom></Typography>
				<Typography variant='body1' color='text.secondary' sx={{ mb: 4 }}>
					Selecciona algun Pokemon como favorito para verlo aqui.
				</Typography>
				<Button variant='contained' component={Link} to='/'>
					Captura Tu Pokemon Fav
				</Button>
			</Container>
		);
	}

	return (
		<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
			<Typography variant={isMobile ? 'h6' : 'h4'} component='h1' gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
				Mis pokemon Favoritos ({favorites.length})
			</Typography>

			<Grid container spacing={3}>
				{favorites.map((pokemon) => (
					<Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
						<PokemonCard pokemon={pokemon} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};
export default Favorites;
