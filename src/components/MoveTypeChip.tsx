import { useEffect, useState } from 'react';
import { Chip, Skeleton } from '@mui/material';
import { getMoveType } from '../api/pokeApi';
import { TYPE_COLORS } from '../utils/pokemonUtils';
import type { PokemonElementType } from '../types/pokemon';

interface MoveTypeChipProps {
	url: string;
}

export const MoveTypeChip: React.FC<MoveTypeChipProps> = ({ url }) => {
	const [type, setType] = useState<PokemonElementType | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const fetchMoveType = async () => {
			try {
				const typeName = await getMoveType(url);

				if (isMounted) {
					if (typeName) setType(typeName);
					setLoading(false);
				}
			} catch (error) {
				console.error('Error fetching move type', error);
				if (isMounted) setLoading(false);
			}
		};

		fetchMoveType();

		return () => {
			isMounted = false;
		};
	}, [url]);

	if (loading) {
		return <Skeleton variant='rounded' width={60} height={24} sx={{ bgcolor: '#333' }} />;
	}

	if (!type) return null;

	return (
		<Chip
			label={type.toUpperCase()}
			size='small'
			sx={{
				backgroundColor: TYPE_COLORS[type] || '#777',
				color: 'white',
				fontWeight: 'bold',
				fontFamily: 'Orbitron',
				fontSize: '0.7rem',
				border: '1px solid rgba(255,255,255,0.2)',
				height: 24,
			}}
		/>
	);
};
