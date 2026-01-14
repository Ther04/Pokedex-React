import type { IPokemonCardData } from '../types/pokemon';
import { useFavorites } from '../context/FavoritesContext';
import { CatchingPokemon } from '@mui/icons-material';
import { Card, CardMedia, Typography, IconButton, CardActionArea, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { PokemonNameUpperCase } from '../utils/pokemonUtils';

interface IPokemonCardProps {
	pokemon: IPokemonCardData;
}

export const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
	const { isFavorite, addFavorite, removeFavorite } = useFavorites();

	const isFav = isFavorite(pokemon.id);

	const handleFavoriteClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		if (isFav) {
			removeFavorite(pokemon.id);
		} else {
			addFavorite(pokemon);
		}
	};

	return (
		<Card
			className='pokemon-card'
			sx={{
				height: '100%',
				display: 'flex',
				position: 'relative',
				transition: 'all 0.3s ease',
				'&:hover': {
					backgroundColor: '#FFFFFF',
					transform: 'translateY(-5px)',
					borderColor: '#FFFFFF',
					boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
					zIndex: 10,
				},
			}}
		>
			<CardActionArea
				component={Link}
				to={`/pokemon/${pokemon.id}`}
				disableRipple
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					p: 2,
					height: '100%',
					'& .MuiCardActionArea-focusHighlight': {
						background: 'transparent !important',
					},
				}}
			>
				<Box
					sx={{
						position: 'relative',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						flexGrow: 1,
						mb: 1,
						zIndex: 2,
					}}
				>
					<Box
						sx={{
							position: 'absolute',
							width: '100px',
							height: '100px',
							background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							borderRadius: '50%',
							zIndex: -1,
							transition: 'opacity 0.3s',
							'.pokemon-card:hover &': { opacity: 0 },
						}}
					/>
					<CardMedia
						component='img'
						image={pokemon.image}
						alt={pokemon.name}
						sx={{
							width: '100%',
							height: 'auto',
							maxHeight: 120,
							objectFit: 'contain',
							filter: 'drop-shadow(0 4px 4px rgba(0,0,0,0.3))',
							transition: 'transform 0.3s',
							'.pokemon-card:hover &': { transform: 'scale(1.1)' },
						}}
					/>
				</Box>

				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 0.5,
						zIndex: 2,
					}}
				>
					<Box
						className='pokemon-info'
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							backgroundColor: '#252525',
							borderRadius: '50px',
							padding: '4px 6px 4px 6px',
							width: '100%',
							maxWidth: '100px',
							border: '1px solid rgba(255,255,255,0.05)',
							transition: 'background-color 0.3s, border-color 0.3s',
							'.pokemon-card:hover &': {
								backgroundColor: '#F5F5F5',
								borderColor: '#E0E0E0',
							},
						}}
					>
						<IconButton
							size='small'
							onClick={handleFavoriteClick}
							disableRipple
							sx={{
								padding: '2px',
								'&:active': {
									transform: 'scale(0.7)', // Se encoge rápido al presionar
								},

								// Hover opcional (solo si quieres que crezca un poquito al pasar el mouse)
								'&:hover': {
									backgroundColor: 'transparent', // Quitamos el fondo gris del hover si molesta
									transform: 'scale(1.1)', // Crece un poquito
								},
							}}
						>
							<CatchingPokemon
								className='pokeball-icon'
								sx={{
									fontSize: 18,
									color: isFav ? '#D32F2F' : '#555',
								}}
							/>
						</IconButton>
						<Typography
							variant='body2'
							sx={{
								fontWeight: 'bold',
								fontFamily: 'Orbitron',
								'.pokemon-card:hover &': {
									color: '#333333', // Se vuelve oscuro en hover
								},
							}}
						>
							#{pokemon.id.toString().padStart(3, '0')}
						</Typography>
					</Box>

					<Typography
						variant='caption'
						sx={{
							textTransform: 'uppercase',
							fontWeight: 'bold',
							opacity: 0.8,
							'.pokemon-card:hover &': {
								color: '#333333', // Se vuelve oscuro en hover
							},
						}}
					>
						{PokemonNameUpperCase(pokemon.name)}
					</Typography>
				</Box>

				{/*<CardContent sx={{ textAlign: 'center' }}>
					<Typography variant='body2' color='text.secondary'>
						#{pokemon.id.toString().padStart(3, '0')}
					</Typography>
					<Typography variant='h6' component='div' sx={{ fontWeight: 16 }}>
						{PokemonNameUpperCase(pokemon.name)}
					</Typography>
				</CardContent> */}
			</CardActionArea>
		</Card>
	);
};
