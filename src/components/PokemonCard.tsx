import type { IPokemonCardData } from '../types/pokemon';
import { useFavorites } from '../context/FavoritesContext';
import { Card, CardContent, CardMedia, Typography, IconButton, CardActionArea } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { PokemonNameUpperCase } from '../utils/pokemonUtils';

interface IPokemonCardProps {
	pokemon: IPokemonCardData;
}

export const PokemonCard: React.FC<IPokemonCardProps> = ({ pokemon }) => {
	const { isFavorite, addFavorite, removeFavorite } = useFavorites();

	const isFav = isFavorite(pokemon.id);

	const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				position: 'relative',
				transition: 'transform 0.2s',
				'&hover': {
					transform: 'scale(1.03)',
					boxShadow: '6',
				},
			}}
		>
			<IconButton
				onClick={handleFavoriteClick}
				aria-label='add to favorites'
				sx={{
					position: 'absolute',
					top: 5,
					right: 5,
					zIndex: 10,
					color: isFav ? 'red' : 'grey',
				}}
			>
				{isFav ? <Favorite /> : <FavoriteBorder />}
			</IconButton>
			<CardActionArea component={Link} to={`/pokemon/${pokemon.id}`} sx={{ flexGrow: 1, pt: 4, pb: 2 }}>
				<CardMedia
					component='img'
					image={pokemon.image}
					alt={pokemon.name}
					sx={{ width: 140, height: 140, objectFit: 'contain', margin: '0 auto' }}
				/>
				<CardContent sx={{ textAlign: 'center' }}>
					<Typography variant='body2' color='text.secondary'>
						#{pokemon.id.toString().padStart(3, '0')}
					</Typography>
					<Typography variant='h6' component='div' sx={{ fontWeight: 16 }}>
						{PokemonNameUpperCase(pokemon.name)}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
