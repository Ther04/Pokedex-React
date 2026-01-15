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
	TextField,
	InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { PokemonCard } from '../components/PokemonCard';
import { useSearchParams } from 'react-router-dom';
import { useIsMobile } from '../hooks/useIsMobile';

const Home = () => {
	const [pokemons, setPokemons] = useState<IPokemonCardData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const page = parseInt(searchParams.get('page') || '1', 10);
	const itemsPerPage = 18;

	const isMobile = useIsMobile();

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

	const filteredPokemons = pokemons.filter((pokemon) => {
		const term = searchTerm.toLowerCase();
		const matchNames = pokemon.name.toLowerCase().includes(term);
		const matchID = pokemon.id.toString().includes(term);

		return matchNames || matchID;
	});

	const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
	const offset = (page - 1) * itemsPerPage;
	const currentPokemons = filteredPokemons.slice(offset, offset + itemsPerPage);

	const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
		setSearchParams({ page: value.toString() });
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setSearchParams({ page: '1' });
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
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
				<Typography variant={isMobile ? 'h6' : 'h4'} component='h1' gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
					Pokedex Nacional (Gen 1 & 2)
				</Typography>

				<TextField
					fullWidth
					variant='outlined'
					placeholder='Buscar por nombre o número'
					value={searchTerm}
					onChange={handleSearchChange}
					sx={{
						maxWidth: 600,
						backgroundColor: '#1E1E1E',
						borderRadius: '30px',
						'& .MuiOutlinedInput-root': {
							backgroundColor: '#1E1E1E',
							borderRadius: '30px',
							color: 'white',
							fontFamily: 'Orbitron',
						},
					}}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position='start'>
									<Search sx={{ color: '#777' }} />
								</InputAdornment>
							),
						},
					}}
				/>
			</Box>

			{filteredPokemons.length === 0 ? (
				<Box sx={{ textAlign: 'center', mt: 5 }}>
					<Typography variant='h6' sx={{ color: '#777', fontFamily: 'Orbitron' }}>
						No se encontraron Pokémons
					</Typography>
				</Box>
			) : (
				<Grid container spacing={1.5}>
					{currentPokemons.map((pokemon) => (
						<Grid key={pokemon.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
							<PokemonCard pokemon={pokemon} />
						</Grid>
					))}
				</Grid>
			)}

			{totalPages > 1 && (
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
						Mostrando {offset + 1} - {Math.min(offset + itemsPerPage, filteredPokemons.length)} de{' '}
						{filteredPokemons.length} Pokémon
					</Typography>
				</Stack>
			)}
		</Container>
	);
};

export default Home;
