import type { PokemonElementType } from '../types/pokemon';

export const TYPE_COLORS: Record<PokemonElementType, string> = {
	fire: '#F44336', // Rojo
	grass: '#4CAF50', // Verde
	water: '#2196F3', // Azul
	poison: '#9C27B0', // Morado
	fairy: '#e09db5', // Rosa pálido
	psychic: '#E91E63', // Rosa fuerte
	normal: '#9E9E9E', // Gris
	steel: '#B0BEC5', // Plateado
	fighting: '#EF6C00', // Naranja oscuro
	rock: '#795548', // Marrón oscuro
	ground: '#ff965d', // Marrón claro (Beige oscuro)
	dark: '#212121', // Gris muy oscuro
	ghost: '#673AB7', // Morado oscuro
	flying: '#9dcdd7', // Gris Azulado muy claro
	ice: '#81D4FA', // Azul claro
	dragon: '#1A237E', // Azul oscuro
	electric: '#ffbb00', // Amarillo
	bug: '#33691E', // Verde oscuro
};

export const getPokemonIdFromUrl = (url: string): number => {
	const segments = url.split('/').filter(Boolean);
	return parseInt(segments[segments.length - 1], 10);
};

export const getPokemonImageUrl = (id: number): string => {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};

export const PokemonNameUpperCase = (name: string): string => {
	return name.charAt(0).toUpperCase() + name.slice(1);
};
