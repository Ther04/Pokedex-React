import { useEffect, useState } from 'react';
import type { IPokemonCardData } from '../types/pokemon';
import { getPokemonList } from '../api/pokeApi';
import { getPokemonIdFromUrl, getPokemonImageUrl } from '../utils/pokemonUtils';
import {
	Box,
	CircularProgress,
	Container,
	Typography,
	Grid,
	Stack,
	Pagination,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { PokemonCard } from '../components/PokemonCard';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
	const [pokemons, setPokemons] = useState<IPokemonCardData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = parseInt(searchParams.get('page') || '1', 10);
	const itemsPerPage = 18;

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

	const offset = (page - 1) * itemsPerPage;
	const currentPokemon = pokemons.slice(offset, offset + itemsPerPage);
	const totalPages = Math.ceil(pokemons.length / itemsPerPage);

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setSearchParams({ page: value.toString() });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
			<Typography variant={isMobile ? 'h6' : 'h4'} component='h1' gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
				Pokedex Nacional (Gen 1 & 2)
			</Typography>

			<Grid container spacing={1.5}>
				{currentPokemon.map((pokemon) => (
					<Grid key={pokemon.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
						<PokemonCard pokemon={pokemon} />
					</Grid>
				))}
			</Grid>

			<Stack spacing={2} sx={{ mt: 5, alignItems: 'center' }}>
				<Pagination
					count={totalPages}
					page={page}
					onChange={handlePageChange}
					color='primary'
					size={isMobile ? 'medium' : 'large'}
					siblingCount={isMobile ? 0 : 1}
					boundaryCount={1}
					showFirstButton={!isMobile}
					showLastButton={!isMobile}
					sx={{
						'& .MuiPaginationItem-root': {
							color: '#FFF',
							borderColor: '#333',
							fontFamily: 'Orbitron',
							'&:hover': {
								backgroundColor: 'rgba(211,47,47,0.2)',
							},
							'&.Mui-Selected': {
								backgroundColor: '#D32F2F',
								color: '#FFF',
								'&:hover': {
									backgroundColor: '#B71C1C',
								},
							},
						},
					}}
				/>
				<Typography variant='caption' sx={{ color: 'text.secondary', fontFamily: 'Orbitron' }}>
					Mostrando {offset + 1} - {Math.min(offset + itemsPerPage, pokemons.length)} de {pokemons.length} Pokémon
				</Typography>
			</Stack>
		</Container>
	);
};

export default Home;
