import React, { useEffect, useState } from 'react';
import { Chip, Skeleton } from '@mui/material';
import axios from 'axios';

const TYPE_COLORS: Record<string, string> = {
	fire: '#F44336', // Rojo
	grass: '#4CAF50', // Verde
	water: '#2196F3', // Azul
	poison: '#9C27B0', // Morado
	fairy: '#F8BBD0', // Rosa pálido
	psychic: '#E91E63', // Rosa fuerte
	normal: '#9E9E9E', // Gris
	steel: '#B0BEC5', // Plateado
	fighting: '#EF6C00', // Naranja oscuro
	rock: '#795548', // Marrón oscuro
	ground: '#ff965d', // Marrón claro (Beige oscuro)
	dark: '#212121', // Gris muy oscuro
	ghost: '#673AB7', // Morado oscuro
	flying: '#BDBDBD', // Gris muy claro
	ice: '#81D4FA', // Azul claro
	dragon: '#1A237E', // Azul oscuro
	electric: '#ffbb00', // Amarillo
	bug: '#33691E', // Verde oscuro
};

interface MoveTypeChipProps {
	url: string;
}

export const MoveTypeChip: React.FC<MoveTypeChipProps> = ({ url }) => {
	const [type, setType] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const fetchMoveType = async () => {
			const cacheKey = `move_type_${url}`;
			const cached = sessionStorage.getItem(cacheKey);

			if (cached) {
				setType(cached);
				setLoading(false);
				return;
			}

			try {
				const response = await axios.get(url);
				const typeName = response.data.type.name;

				if (isMounted) {
					setType(typeName);
					sessionStorage.setItem(cacheKey, typeName);
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
