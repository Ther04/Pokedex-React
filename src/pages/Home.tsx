import { useEffect, useState } from 'react';
import type { IPokemonCardData } from '../types/pokemon';
import { getPokemonList } from '../api/pokeApi';
import { getPokemonIdFromUrl, getPokemonImageUrl } from '../utils/pokemonUtils';
import { Box, CircularProgress, Container, Typography, Grid } from '@mui/material';
import { PokemonCard } from '../components/PokemonCard';

const Home = () => {
	const [pokemons, setPokemons] = useState<IPokemonCardData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				setLoading(true);
				const data = await getPokemonList(251, 0);

				const formattedPokemon: IPokemonCardData[] = data.results.map((pokemon) => ({
					id: getPokemonIdFromUrl(pokemon.url),
					name: pokemon.name,
					image: getPokemonImageUrl(getPokemonIdFromUrl(pokemon.url)),
				}));

				setPokemons(formattedPokemon);
			} catch {
				console.error('los pokemones no se han podido cargar');
			} finally {
				setLoading(false);
			}
		};

		fetchPokemon();
	}, []);

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
			<Typography variant='h4' component='h1' gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
				Pokedex Nacional (Gen 1 & 2)
			</Typography>

			<Grid container spacing={3}>
				{pokemons.map((pokemon) => (
					// xs En movil ocupa todo el ancho
					// sm En tablet ocupa la mitad
					// md En laptop pequeña
					// lg En monitor grande
					<Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
						<PokemonCard pokemon={pokemon} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Home;
