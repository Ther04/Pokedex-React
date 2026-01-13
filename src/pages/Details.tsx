import React, { useState, useEffect } from 'react';
import { Box, Button, Chip, CircularProgress, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import type { IPokemonDetails } from '../types/pokemon';
import { useNavigate, useParams } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { getPokemonDetails } from '../api/pokeApi';
import { ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material';
import { PokemonNameUpperCase } from '../utils/pokemonUtils';

const Details = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { addFavorite, removeFavorite, isFavorite } = useFavorites();

	const [PokemonDetail, setPokemonDetail] = useState<IPokemonDetails | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchPokemonDetails = async () => {
			if (!id) return;
			try {
				setLoading(true);
				const { data } = await getPokemonDetails(id);
				setPokemonDetail(data);
			} catch (error) {
				console.error('Error fetching Pokémon details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchPokemonDetails();
	}, [id]);

	if (loading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
				<CircularProgress />
			</Box>
		);
	}

	if (!PokemonDetail) {
		return (
			<Typography variant='h5' align='center' sx={{ mt: 5 }}>
				No se encontró el Pokémon
			</Typography>
		);
	}

	const isFav = isFavorite(PokemonDetail.id);

	const handleFavoriteClick = () => {
		if (isFav) {
			removeFavorite(PokemonDetail.id);
		} else {
			addFavorite({
				id: PokemonDetail.id,
				name: PokemonDetail.name,
				image: PokemonDetail.sprites.front_default,
			});
		}
	};

	return (
		<Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
			<Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
				volver
			</Button>
			<Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
				<Grid container spacing={4}>
					<Grid size={{ xs: 12, md: 6 }}>
						<Box
							component='img'
							src={PokemonDetail.sprites.other['official-artwork'].front_default}
							alt={PokemonDetail.name}
							sx={{
								width: '100%',
								maxWidth: '300',
								height: 'auto',
								filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))',
							}}
						/>
					</Grid>

					<Grid size={{ xs: 12, md: 6 }}>
						<Box>
							<Typography>{PokemonNameUpperCase(PokemonDetail.name)}</Typography>
							<Typography>#{PokemonDetail.id.toString().padStart(3, '0')}</Typography>
						</Box>

						<Box>
							{PokemonDetail.types.map((typeInfo) => (
								<Chip
									key={typeInfo.type.name}
									label={PokemonNameUpperCase(typeInfo.type.name)}
									sx={{ mr: 1, backgroundColor: 'f0f0f0', fontWeight: 'bold' }}
								/>
							))}
						</Box>

						<Divider sx={{ mb: 3 }} />

						<Grid container spacing={2}>
							<Grid size={{ xs: 6 }}>
								<Typography variant='subtitle2' color='text.secondary'>
									Altura
								</Typography>
								<Typography variant='h6'>{PokemonDetail.height / 10} m</Typography>
							</Grid>

							<Grid size={{ xs: 6 }}>
								<Typography variant='subtitle2' color='text.secondary'>
									peso
								</Typography>
								<Typography variant='h6'>{PokemonDetail.weight / 10} kg</Typography>
							</Grid>
						</Grid>

						<Typography variant='subtitle2' color='text.secondary' sx={{ mt: 3 }}>
							Habilidades
						</Typography>
						<Box>
							{PokemonDetail.abilities.map((abilityInfo) => {
								console.log(abilityInfo);
								return null;
							})}
							{PokemonDetail.abilities.map((abilityInfo) => (
								<Chip
									key={abilityInfo.ability.name}
									label={PokemonNameUpperCase(abilityInfo.ability.name)}
									variant='outlined'
									size='small'
									sx={{ mr: 1, mb: 1 }}
								/>
							))}
						</Box>

						<Button
							variant={isFav ? 'outlined' : 'contained'}
							color={isFav ? 'error' : 'primary'}
							startIcon={isFav ? <Favorite /> : <FavoriteBorder />}
							onClick={handleFavoriteClick}
							fullWidth
							size='large'
						>
							{isFav ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default Details;
